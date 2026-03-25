# StoryForge — AI Media Production Pipeline

> AO-powered mass content production engine for serialized stories (comics, motion comics, animated episodes)

## Purpose

StoryForge is a media pipeline that mass-produces high-quality serialized stories at scale. It generates comics, motion comics, and animated episodes across dozens of genres and worlds simultaneously. AO orchestrates the multi-phase production workflow. A Postgres database tracks every world, character, arc, season, and episode. Custom MCP servers enforce story coherence and expose AI models (image, video, voice, music) to the pipeline. A human reviews and publishes finished episodes.

The pipeline feeds a subscription app ($4.99/week) with a massive, ever-growing content library.

## What This Document Covers

This document covers the **media pipeline only** — the factory that produces content. The mobile app is a separate project that consumes the pipeline's output.

---

## Content Strategy

### Scale
- Dozens of series running simultaneously across genres
- Each series has 1+ seasons, each season has multiple episodes
- New series launch regularly to keep the library growing
- Episodes produced in bulk via AO daemon scheduling

### Genres (non-exhaustive)
- Apocalypse / end of the world
- Romance / drama
- Horror / thriller
- Comedy / slice of life
- Sci-fi / space opera
- Fantasy / magic
- Crime / mystery
- Superhero
- Historical fiction
- Coming of age
- Corny / feel-good
- Action / martial arts
- Supernatural / paranormal

### Output Formats
- **Static comic** — paneled pages (primary format)
- **Motion comic** — animated panels with parallax, voice, music
- **Animated episode** — fully animated short with voice acting, SFX, score

Each episode is produced as a static comic first, then optionally elevated to motion comic or animated episode based on series priority and human review.

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────┐
│                    AO Daemon                         │
│          (bulk scheduling across all series)          │
├─────────────────────────────────────────────────────┤
│                                                       │
│  Series A    Series B    Series C    ...  Series N    │
│  (horror)    (romance)   (sci-fi)        (comedy)    │
│     │            │           │               │        │
│     └────────────┼───────────┼───────────────┘        │
│                  │                                     │
│          ┌───────▼────────┐                           │
│          │  MCP Servers   │                           │
│          │                │                           │
│          │  storyforge    │  ← universe DB            │
│          │  replicate     │  ← image/video models     │
│          │  audio         │  ← voice/music/SFX        │
│          │  assembly      │  ← compositing            │
│          └───────┬────────┘                           │
│                  │                                     │
│          ┌───────▼────────┐                           │
│          │   Postgres     │                           │
│          │  (all worlds,  │                           │
│          │   all series)  │                           │
│          └────────────────┘                           │
│                                                       │
│          ┌────────────────┐                           │
│          │  Review Queue  │  ← human reviews here     │
│          └───────┬────────┘                           │
│                  │                                     │
│          ┌───────▼────────┐                           │
│          │  Output Store  │  ← finished episodes      │
│          │  (S3/R2/CDN)   │     ready for app team    │
│          └────────────────┘                           │
└─────────────────────────────────────────────────────┘
```

---

## Database Schema (Postgres)

### Series & World Management

```sql
-- A world defines the setting, rules, and visual style
worlds (
  id              serial PRIMARY KEY,
  name            text NOT NULL,
  genre           text NOT NULL,
  tone            text,              -- "dark and gritty", "lighthearted", "campy"
  rules           jsonb,             -- world-specific constraints (magic system, tech level, etc.)
  setting         text,              -- time period, location, universe description
  art_style_id    int REFERENCES art_styles(id),
  created_at      timestamptz DEFAULT now()
)

-- A series is a named show/comic within a world
series (
  id              serial PRIMARY KEY,
  world_id        int REFERENCES worlds(id),
  title           text NOT NULL,
  logline         text,              -- one-line pitch
  genre           text NOT NULL,
  target_audience text,              -- "teens", "adults", "all ages"
  status          text DEFAULT 'active',  -- active, paused, complete
  created_at      timestamptz DEFAULT now()
)

-- A season is a collection of episodes within a series
seasons (
  id              serial PRIMARY KEY,
  series_id       int REFERENCES series(id),
  season_number   int NOT NULL,
  title           text,
  premise         text,              -- what this season is about
  episode_count   int,               -- target number of episodes
  status          text DEFAULT 'in_production',  -- in_production, complete
  created_at      timestamptz DEFAULT now()
)
```

### Characters & Relationships

```sql
characters (
  id                    serial PRIMARY KEY,
  world_id              int REFERENCES worlds(id),
  name                  text NOT NULL,
  role                  text,          -- "protagonist", "antagonist", "supporting", "recurring"
  appearance            text NOT NULL, -- detailed visual description for image prompts
  personality           jsonb,         -- traits, quirks, motivations
  voice_style           text,          -- how they talk: "sarcastic", "formal", "street slang"
  backstory             text,
  knowledge_state       jsonb DEFAULT '{}', -- what this character currently knows (updated per episode)
  relationships         jsonb DEFAULT '{}', -- {character_id: "rivals", "lovers", "siblings", etc.}
  reference_image_urls  text[],        -- character sheet images for visual consistency
  character_sheet_prompt text,         -- base prompt for generating this character
  voice_id              text,          -- TTS provider voice ID for this character
  voice_provider        text,          -- "elevenlabs", "fish", "inworld", "hume"
  alive                 boolean DEFAULT true,
  created_at            timestamptz DEFAULT now()
)
```

### Story Structure

```sql
story_arcs (
  id              serial PRIMARY KEY,
  season_id       int REFERENCES seasons(id),
  title           text NOT NULL,
  premise         text,
  arc_type        text,              -- "main", "subplot", "character_arc"
  status          text DEFAULT 'active',  -- active, resolved, abandoned
  tension_curve   jsonb,             -- planned escalation beats
  start_episode   int,
  end_episode     int,
  created_at      timestamptz DEFAULT now()
)

episodes (
  id              serial PRIMARY KEY,
  season_id       int REFERENCES seasons(id),
  episode_number  int NOT NULL,
  title           text,
  synopsis        text,
  status          text DEFAULT 'planned',
    -- planned → outlining → scripting → illustrating → assembling
    -- → in_review → approved → published → rejected
  output_format   text DEFAULT 'comic',  -- comic, motion_comic, animated
  output_url      text,              -- final packaged episode location (S3/R2)
  reviewer_notes  text,              -- human reviewer feedback
  reviewed_by     text,
  reviewed_at     timestamptz,
  published_at    timestamptz,
  created_at      timestamptz DEFAULT now()
)
```

### Panels & Visual Assets

```sql
panels (
  id              serial PRIMARY KEY,
  episode_id      int REFERENCES episodes(id),
  page_number     int NOT NULL,
  panel_number    int NOT NULL,
  script_text     text,              -- internal direction (not shown to reader)
  dialogue        jsonb,             -- [{character_id, text, delivery}]
  narration       text,
  scene_description text NOT NULL,   -- what's happening visually
  camera_angle    text,              -- "close-up", "wide shot", "bird's eye", "over shoulder"
  mood            text,              -- "tense", "romantic", "chaotic", "peaceful"
  image_prompt    text,              -- generated by art director agent
  image_url       text,              -- generated image
  video_url       text,              -- animated panel (if motion comic)
  layout_position text,              -- panel size/position on page
  created_at      timestamptz DEFAULT now()
)

art_styles (
  id              serial PRIMARY KEY,
  name            text NOT NULL,
  base_prompt_prefix text NOT NULL,  -- prepended to every image prompt in this style
  negative_prompt text,
  color_palette   jsonb,
  line_style      text,              -- "clean lineart", "sketchy", "painterly", "cel-shaded"
  reference_images text[],
  lora_model_id   text,              -- trained LoRA for this style (if any)
  image_model     text DEFAULT 'nano-banana-pro',  -- which model to use
  created_at      timestamptz DEFAULT now()
)
```

### Continuity Tracking

```sql
continuity_log (
  id                    serial PRIMARY KEY,
  world_id              int REFERENCES worlds(id),
  episode_id            int REFERENCES episodes(id),
  event_description     text NOT NULL,
  characters_involved   int[],
  consequences          jsonb,        -- what changed as a result
  character_knowledge   jsonb,        -- {character_id: "what they learned"}
  created_at            timestamptz DEFAULT now()
)

lore_entries (
  id              serial PRIMARY KEY,
  world_id        int REFERENCES worlds(id),
  category        text NOT NULL,     -- history, magic, technology, culture, geography, politics
  title           text NOT NULL,
  content         text NOT NULL,
  referenced_in   int[],             -- episode IDs where this lore is relevant
  created_at      timestamptz DEFAULT now()
)
```

### Audio Assets

```sql
voice_profiles (
  id              serial PRIMARY KEY,
  character_id    int REFERENCES characters(id),
  provider        text NOT NULL,     -- elevenlabs, fish, inworld, hume
  voice_id        text NOT NULL,     -- provider-specific ID
  sample_url      text,
  style_notes     text               -- "gruff", "high-pitched", "southern accent"
)

audio_tracks (
  id              serial PRIMARY KEY,
  episode_id      int REFERENCES episodes(id),
  track_type      text NOT NULL,     -- dialogue, narration, music, sfx
  panel_id        int REFERENCES panels(id),  -- null for episode-level tracks
  character_id    int REFERENCES characters(id),  -- null for non-dialogue
  text_content    text,              -- script text that was spoken (for dialogue/narration)
  provider        text,
  audio_url       text,
  duration_ms     int,
  created_at      timestamptz DEFAULT now()
)
```

### Review Queue

```sql
review_queue (
  id              serial PRIMARY KEY,
  episode_id      int REFERENCES episodes(id) UNIQUE,
  series_title    text,
  episode_title   text,
  episode_number  int,
  format          text,              -- comic, motion_comic, animated
  preview_url     text,              -- link to preview the episode
  assets_url      text,              -- link to all raw assets
  status          text DEFAULT 'pending',  -- pending, in_review, approved, rejected, needs_rework
  reviewer_notes  text,
  submitted_at    timestamptz DEFAULT now(),
  reviewed_at     timestamptz
)
```

---

## Custom MCP Servers

MCP servers are the control layer. Agents interact with the universe and AI models exclusively through MCP tools. This enforces consistency — agents cannot bypass world rules or character constraints.

### 1. storyforge-mcp — Universe Database

Every agent reads and writes story state through this server. The server validates writes against world rules and character knowledge.

**Read tools:**
```
storyforge.get_world(world_id)
storyforge.get_series(series_id)
storyforge.get_season(season_id)
storyforge.get_character(character_id)
storyforge.get_character_knowledge(character_id)
storyforge.get_relationships(character_id)
storyforge.get_art_style(style_id)
storyforge.get_arc(arc_id)
storyforge.get_episode(episode_id)
storyforge.get_panels(episode_id)
storyforge.query_continuity(world_id, up_to_episode)
storyforge.search_lore(world_id, query)
storyforge.list_series(filters)
storyforge.list_episodes(season_id, status_filter)
```

**Write tools (validated):**
```
storyforge.create_world(data)
storyforge.create_series(world_id, data)
storyforge.create_season(series_id, data)
storyforge.create_character(world_id, data)
storyforge.create_arc(season_id, data)
storyforge.create_episode(season_id, data)
storyforge.write_panel(episode_id, panel_data)
  → validates: character dialogue matches voice_style
  → validates: character only references things in their knowledge_state
  → validates: scene is consistent with world rules
storyforge.update_continuity(episode_id, events)
  → automatically updates character knowledge_state for involved characters
storyforge.update_episode_status(episode_id, status)
storyforge.update_character(character_id, changes)
storyforge.add_lore(world_id, data)
storyforge.kill_character(character_id, episode_id, cause)
  → sets alive=false, logs to continuity
```

**Validation examples:**
- Agent writes dialogue where character A mentions a secret only character B knows → MCP rejects, returns error with explanation
- Agent sets a scene in a world with "no magic" rule but describes a spell → MCP rejects
- Agent references a character who died in a previous episode as alive → MCP rejects

### 2. replicate-mcp — AI Model Gateway

Wraps Replicate (and other providers like fal.ai) to expose image/video generation.

```
replicate.generate_image(model, prompt, style_ref, dimensions, lora, negative_prompt)
replicate.generate_image_batch(model, prompts[])      → bulk panel generation
replicate.generate_video(model, image_url, motion_prompt, duration, provider)
replicate.upscale(image_url, scale_factor)
replicate.remove_background(image_url)
replicate.style_transfer(image_url, style_ref)
replicate.run_model(model_id, input)                   → generic: run any model
replicate.check_status(prediction_id)                  → poll async jobs
```

### 3. audio-mcp — Voice, Music, SFX

Unified audio generation across all providers.

```
audio.generate_speech(text, voice_id, emotion, provider, audio_tags)
audio.generate_speech_batch(lines[])                   → bulk dialogue generation
audio.generate_music(prompt, duration_seconds, mood, genre, loop, provider)
audio.generate_sfx(description, duration_seconds, loop, provider)
audio.clone_voice(audio_sample_url, name, provider)    → returns voice_id
audio.list_voices(character_id)
```

### 4. assembly-mcp — Panel Compositing & Episode Assembly

Turns raw assets into finished episodes.

```
assembly.layout_page(panels[], template)               → composites panels into comic page
assembly.add_speech_bubbles(page_image, dialogue[])    → overlays text/bubbles on page
assembly.create_motion_comic(panels[], audio_tracks[]) → animated panels with parallax + audio
assembly.stitch_episode(pages[], music, sfx, format)   → assembles full episode package
assembly.export(episode_id, format)                    → outputs final deliverable (PDF, MP4, webp sequence)
assembly.generate_cover(series_id, season_number)      → series/season cover art
assembly.generate_thumbnail(episode_id)                → episode thumbnail for app
```

### 5. review-mcp — Human Review Interface

Manages the review queue that the human reviewer works from.

```
review.submit_for_review(episode_id, preview_url, assets_url)
review.get_queue(status_filter)
review.get_episode_review(episode_id)
review.approve(episode_id)
review.reject(episode_id, notes)
review.request_rework(episode_id, notes, rework_phases[])
```

---

## Subject Dispatch — Content-Aware Model Routing

The pipeline routes work to different LLMs based on what kind of content is being produced. This is configured per-world but has sensible defaults.

| Content Type | Default Model | Why |
|---|---|---|
| World-building, lore, rules | Opus | Deep reasoning for coherent rule systems |
| Season/arc planning | Opus | Long-range plot structure |
| Episode outlining | Sonnet | Good balance of creativity and structure |
| Emotional dialogue, character moments | Sonnet | Best at nuanced, natural dialogue |
| Action sequences, fight scenes | Gemini | Strong spatial/visual scene description |
| Comedy, witty banter | Sonnet | Best comedic timing |
| Horror/tension scenes | Opus | Psychological depth, pacing |
| Art direction, image prompts | Gemini | Understands visual composition |
| Continuity review | Opus | Cross-references entire story history |
| Character voice check | Sonnet | Pattern matching on voice/personality |
| Music/mood direction | Haiku | Lightweight — just matches mood to scene |

Dispatch is configurable. A horror series might route all writing to Opus for darker tone. A comedy might route everything to Sonnet.

---

## AO Workflow Pipeline

### World Creation Workflow (run once per new series)

```yaml
workflows:
  - id: create-world
    name: "World Creation"
    description: "Bootstrap a new series: world, characters, art style, season 1 arc"
    phases:
      - build-world
      - create-characters
      - establish-art-style
      - plan-season
      - generate-character-sheets
      - clone-voices
```

**build-world**: Agent creates world record with genre, tone, rules, setting via `storyforge.create_world()`. Creates series and first season.

**create-characters**: Agent designs cast — protagonist, antagonist, supporting. Creates each via `storyforge.create_character()` with full appearance, personality, voice style, backstory, relationships.

**establish-art-style**: Agent defines the visual style for this world. Creates art_style record with base_prompt_prefix, color_palette, line_style. Optionally triggers LoRA training on reference images.

**plan-season**: Agent outlines season 1 — story arcs, episode count, tension curve, key plot beats. Creates arc records via `storyforge.create_arc()`.

**generate-character-sheets**: Command phase calls `replicate.generate_image()` to create reference sheets for each character (multiple angles, expressions). Stores URLs on character records.

**clone-voices**: Command phase calls `audio.clone_voice()` for each character using sample audio or generates a voice from description (Hume Octave). Stores voice_id on character records.

### Episode Production Workflow (run per episode, bulk scheduled)

```yaml
workflows:
  - id: produce-episode
    name: "Episode Production"
    description: "Full pipeline: outline → script → art → audio → assemble → review queue"
    phases:
      - outline-episode
      - write-script
      - script-review
      - art-direction
      - generate-images
      - generate-audio
      - assemble-episode
      - quality-check
      - submit-for-review
```

#### Phase 1: outline-episode (agent, Opus)
- Queries `storyforge.query_continuity()` for full story-so-far
- Queries `storyforge.get_arc()` for current arc progression and tension curve
- Determines which characters appear, what plot beats to hit
- Creates episode record via `storyforge.create_episode()`
- Outputs scene-by-scene outline

#### Phase 2: write-script (agent, routed by subject dispatch)
- For each scene, queries relevant character knowledge and relationships via MCP
- Writes panel-by-panel: dialogue (with delivery notes), narration, scene descriptions, camera angles, mood
- Uses `storyforge.write_panel()` — MCP validates each panel against world rules and character knowledge
- If validation fails, agent receives error and rewrites

#### Phase 3: script-review (agent, Opus)
- Reads complete script
- Queries continuity log and all referenced character states
- Checks for: plot holes, voice inconsistency, pacing problems, continuity breaks, world rule violations
- If issues found → sets episode status back to "scripting" with notes (rework loop back to write-script)
- If clean → advances to art-direction

#### Phase 4: art-direction (agent, Gemini)
- Reads each panel's scene description, mood, camera angle
- Queries `storyforge.get_art_style()` for style constraints
- Queries `storyforge.get_character()` for reference sheets of appearing characters
- Generates detailed image prompt per panel: style prefix + character refs + scene + camera + lighting + mood
- Stores image_prompt on each panel record

#### Phase 5: generate-images (command)
- Calls `replicate.generate_image_batch()` with all panel prompts
- Uses character reference sheets for consistency
- Model selection based on art_style.image_model (default: Nano Banana Pro)
- Stores image_url on each panel record
- Failed generations → retry with adjusted prompt (up to 3 attempts)

#### Phase 6: generate-audio (agent + command)
- Agent determines music mood per scene, selects SFX per panel
- Calls `audio.generate_speech_batch()` for all dialogue lines using character voice_ids
- Calls `audio.generate_music()` for background score per scene
- Calls `audio.generate_sfx()` for sound effects
- Stores all audio URLs in audio_tracks table

#### Phase 7: assemble-episode (command)
- Calls `assembly.layout_page()` to composite panels into pages
- Calls `assembly.add_speech_bubbles()` for dialogue overlays
- If motion_comic format: calls `assembly.create_motion_comic()`
- Calls `assembly.stitch_episode()` for final package
- Calls `assembly.export()` → uploads to S3/R2
- Calls `assembly.generate_thumbnail()`
- Stores output_url on episode record

#### Phase 8: quality-check (agent, Opus)
- Reviews assembled episode for:
  - Art consistency across panels
  - Text readability in bubbles
  - Audio sync (if motion comic)
  - Story flow when read sequentially
  - Overall quality bar
- If issues → kicks back to relevant phase
- If clean → advances to review

#### Phase 9: submit-for-review (command)
- Calls `review.submit_for_review()` with preview URL and assets URL
- Sets episode status to "in_review"
- Human reviewer sees it in their queue

### Bulk Scheduling

AO daemon runs episode production across all active series on a schedule:

```yaml
schedules:
  - id: bulk-produce
    cron: "0 */4 * * *"    # every 4 hours
    workflow_ref: produce-episode
    description: "Pick next episode from any active series and produce it"
    enabled: true

  - id: new-series-weekly
    cron: "0 9 * * 1"      # Monday 9am
    workflow_ref: create-world
    description: "Launch a new series each week to grow the library"
    enabled: true
```

The bulk-produce scheduler picks the next episode to produce based on:
1. Series with the fewest episodes in the library (balance coverage)
2. Series with the most subscriber engagement (prioritize popular worlds)
3. Series approaching season finale (don't leave cliffhangers hanging)

---

## AI Model Stack

### Image Generation

| Model | Provider | Cost/Image | Best For | Replicate ID |
|---|---|---|---|---|
| **Nano Banana Pro** | Google | $0.04 (Replicate), $0.003 (subscription) | Full comic page, multi-panel layouts, character consistency | `google/nano-banana-pro` |
| **Nano Banana 2** | Google | $0.045-0.15 | Fast gen, Pro quality at Flash speed | `google/nano-banana-2` |
| **FLUX Kontext Pro** | Black Forest Labs | $0.04 | Single-ref character consistency, no LoRA needed | `black-forest-labs/flux-kontext-pro` |
| **FLUX.2 Pro** | Black Forest Labs | $0.031 | Multi-reference (up to 8 images) | `black-forest-labs/flux-2-pro` |
| **FLUX.2 Flex** | Black Forest Labs | $0.063 | Highest quality, up to 10 input refs | `black-forest-labs/flux-2-flex` |
| **Ideogram v3** | Ideogram | $0.09 | Best text rendering (speech bubbles, SFX text) | `ideogram-ai/ideogram-v3-quality` |
| **Seedream 4.5** | ByteDance | varies | Locked character identity across sequential shots | `bytedance/seedream-*` |
| **SDXL + LoRA** | Stability | $0.004 | Budget option, massive LoRA ecosystem | `stability-ai/sdxl` |
| **FLUX.1 Dev + LoRA** | BFL | $0.025 | Custom art style training (<$2 to train) | `lucataco/flux-dev-lora` |
| **Illustrious XL** | Community | ~$0.004 | Anime/manga native aesthetics | `ultracoderru/nova-anime-xl-il-140` |
| **Imagen 4** | Google | $0.02-0.06 | Google's dedicated image model | via Google API |

**Default for comics**: Nano Banana Pro — generates full comic pages with multi-panel layouts natively, strong character consistency, $0.003/image at subscription tier.

### Video Generation (Motion Comics / Animation)

| Model | Provider | Cost | Duration | Best For |
|---|---|---|---|---|
| **Seedance 2.0** | ByteDance | ~$0.05/5s | Up to 30s | Best character consistency (12 reference inputs) |
| **Kling 3.0 Pro** | Kuaishou | ~$0.224/s | Up to 120s | Best realistic human motion |
| **Veo 3.1** | Google | $0.10-0.40/s | 8s/gen | Highest visual quality, native 4K |
| **Veo 3.1 Fast** | Google | $0.15/s | 8s/gen | Good quality, lower cost |
| **Runway Gen-4** | Runway | ~$0.05-0.15/s | Up to 45s | Best creative controls, up to 4K |
| **Hailuo 2.3** | MiniMax | ~$0.017-0.045/s | 6-15s | Cheapest proprietary |
| **Wan 2.6** | Alibaba | $0.05/s | varies | Open source, self-hostable, budget |

**API aggregator**: fal.ai — single integration, access to all video models.

**Default for motion comics**: Seedance 2.0 for hero animations. Hailuo 2.3 for bulk panel animations.

### Voice / Text-to-Speech

| Provider | Cost | Cloning | Emotion Control | Best For |
|---|---|---|---|---|
| **ElevenLabs v3** | ~$206/1M chars | Yes (instant + pro) | Best — audio tags: `[whispers]`, `[SHOUTS]`, `[laughs]` | Hero characters, narration |
| **Hume Octave 2** | ~half ElevenLabs | Yes + design from description | Emotion-native AI | Designing fictional character voices |
| **Fish Audio S2** | $15/1M UTF-8 bytes | Yes (15s sample) | Good | Bulk dialogue (80% cheaper than ElevenLabs) |
| **Inworld TTS 1.5** | $5-10/1M chars | Yes (15s, zero-shot) | Good | Cheapest, has viseme timestamps for lip-sync |
| **OpenAI gpt-4o-mini-tts** | ~$0.015/min | No (13 presets) | Good (natural language) | Narrator voice, small casts |
| **Cartesia Sonic 3** | from $5/mo | Yes (15s) | Moderate | Real-time, 40ms latency |

**Default**: ElevenLabs v3 for main characters (audio tag control is unmatched). Fish Audio for bulk supporting character dialogue. Inworld TTS for any lip-sync animation needs.

### Music Generation

| Provider | Cost | Vocals | Looping | License | Best For |
|---|---|---|---|---|---|
| **ElevenLabs Music** | $0.33-0.80/min | Yes | Manual | Commercial (paid plans) | One-stop: same platform as TTS + SFX |
| **Google Lyria RealTime** | Free (experimental) | No | Yes (infinite) | Google TOS | Loopable background score |
| **Google Lyria 2** | $0.06/30s | No | No | Google TOS | High-fidelity instrumentals |
| **ACE-Step 1.5** | $0.015/gen (Replicate) | Yes | No | Apache 2.0 | Cheapest, self-hostable, fast |
| **MiniMax Music 2.5** | $0.03-0.035/gen | Yes | No | Commercial | Best price-to-quality via API |
| **Suno v5** | $0.03-0.15 (3rd party) | Yes | No | Commercial (Pro+) | Highest quality, no official API |

**Default**: Google Lyria RealTime for continuous background music. ACE-Step 1.5 for bulk track generation. ElevenLabs Music for themed songs/intros.

### Sound Effects

| Provider | Cost | Loopable | License | Best For |
|---|---|---|---|---|
| **ElevenLabs SFX V2** | credits-based | Yes (native loop param) | Royalty-free | Primary SFX — cinematic Foley, ambience |
| **Stable Audio 2.5** | varies | No | Requires license | Secondary SFX |

**Default**: ElevenLabs SFX V2 — only provider with native loop parameter, 48kHz quality, royalty-free.

---

## Cost Per Episode (Estimated)

Assuming a 20-page comic episode with ~80 panels:

| Component | Model | Count | Unit Cost | Total |
|---|---|---|---|---|
| Writing (outline + script + review) | Sonnet/Opus | ~10 agent calls | ~$0.30-1.00/call | $5.00 |
| Image generation | Nano Banana Pro (Google sub) | 80 panels | $0.003 | $0.24 |
| Image generation | Nano Banana Pro (Replicate) | 80 panels | $0.04 | $3.20 |
| Motion comic clips (optional) | Seedance 2.0 | 20 key panels × 5s | $0.05/5s | $1.00 |
| Character voices | Fish Audio | ~5,000 chars | $15/1M chars | $0.08 |
| Background music | ACE-Step 1.5 | 3 tracks | $0.015/gen | $0.05 |
| Sound effects | ElevenLabs SFX | 15 effects | ~$0.10 | $1.50 |
| Quality review | Opus | 2 passes | ~$1.00/pass | $2.00 |
| **Static comic total** | | | | **~$6-9** |
| **Motion comic total** | | | | **~$10-13** |

At bulk production (20+ episodes/week across all series), monthly content cost is approximately **$500-1,200/month**.

---

## Output Specification

The pipeline outputs finished episodes to a storage bucket (S3/R2). The app team consumes from this bucket. Each episode is a directory:

```
/episodes/{series_id}/{season_number}/{episode_number}/
  ├── metadata.json          # title, synopsis, characters, episode number, series info
  ├── comic/
  │   ├── page_01.webp       # composited comic pages
  │   ├── page_02.webp
  │   └── ...
  ├── panels/                # individual panels (for panel-by-panel reader)
  │   ├── p01_panel01.webp
  │   ├── p01_panel02.webp
  │   └── ...
  ├── motion_comic/          # (if produced)
  │   └── episode.mp4
  ├── audio/
  │   ├── dialogue/          # individual voice lines
  │   ├── music/             # background tracks
  │   └── sfx/               # sound effects
  ├── thumbnail.webp
  └── cover.webp             # (for first episode of season)
```

`metadata.json` contains everything the app needs to display and play the episode without querying the pipeline database.

---

## Human Review Process

1. AO produces episode → submits to review queue
2. Human reviewer opens review dashboard (simple web UI or CLI)
3. Reviewer can:
   - **Preview** the full episode (comic pages or motion comic)
   - **Approve** → episode moves to output store, ready for app
   - **Reject** → episode is discarded, logged for pipeline improvement
   - **Request rework** → specifies which phases to re-run with notes (e.g., "panel 5 art is off-style, regenerate")
4. Rework request triggers AO to re-run specified phases with reviewer notes injected into agent prompts
5. Reworked episode returns to review queue

---

## Implementation Priority

### Phase 1: Database + Core MCP
- Postgres schema + migrations
- storyforge-mcp server (TypeScript/Node)
- Seed one test world with characters and art style manually

### Phase 2: Writing Pipeline
- AO workflow YAML for episode production (phases 1-3: outline, script, review)
- Agent system prompts for writer, reviewer
- Subject dispatch configuration
- Produce first scripted episodes (text only, no images yet)

### Phase 3: Visual Pipeline
- replicate-mcp server
- Art direction agent + image generation phases
- assembly-mcp server (panel compositing, speech bubbles)
- Produce first complete static comic episodes

### Phase 4: Audio Pipeline
- audio-mcp server (ElevenLabs + Fish Audio + Lyria integration)
- Voice cloning for characters
- Music and SFX generation
- Motion comic assembly

### Phase 5: Review + Output
- review-mcp server
- Review dashboard (web UI)
- Output store structure (S3/R2)
- Bulk scheduling configuration
- Human review workflow end-to-end

### Phase 6: Scale
- Launch multiple series across genres
- Tune quality gates based on reviewer feedback
- Optimize costs (model selection, batch processing)
- World creation workflow for rapid series launches
