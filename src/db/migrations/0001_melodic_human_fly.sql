CREATE TABLE `clients` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`name` text NOT NULL,
	`email` text DEFAULT '' NOT NULL,
	`phone` text DEFAULT '' NOT NULL,
	`company` text DEFAULT '' NOT NULL,
	`address` text DEFAULT '' NOT NULL,
	`city` text DEFAULT '' NOT NULL,
	`state` text DEFAULT '' NOT NULL,
	`zip` text DEFAULT '' NOT NULL,
	`country` text DEFAULT '' NOT NULL,
	`notes` text DEFAULT '' NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updated_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `clients_user_id_idx` ON `clients` (`user_id`);--> statement-breakpoint
CREATE TABLE `recurring_invoices` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`title` text NOT NULL,
	`frequency` text NOT NULL,
	`next_run_at` text NOT NULL,
	`last_run_at` text,
	`status` text DEFAULT 'active' NOT NULL,
	`template_json` text NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updated_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `user_settings` (
	`user_id` text PRIMARY KEY NOT NULL,
	`business_name` text DEFAULT '' NOT NULL,
	`business_email` text DEFAULT '' NOT NULL,
	`business_address` text DEFAULT '' NOT NULL,
	`business_city` text DEFAULT '' NOT NULL,
	`business_state` text DEFAULT '' NOT NULL,
	`business_zip` text DEFAULT '' NOT NULL,
	`business_country` text DEFAULT '' NOT NULL,
	`default_currency` text DEFAULT 'USD' NOT NULL,
	`default_tax_rate` real DEFAULT 0 NOT NULL,
	`default_notes` text DEFAULT '' NOT NULL,
	`invoice_number_prefix` text DEFAULT 'INV-' NOT NULL,
	`updated_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
ALTER TABLE `invoices` ADD `paid_at` text;--> statement-breakpoint
ALTER TABLE `invoices` ADD `paid_method` text;--> statement-breakpoint
ALTER TABLE `invoices` ADD `paid_reference` text;