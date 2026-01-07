import * as z from "zod";

export const BillActionsSchema = z
	.object({
		actionCode: z.string(),
		actionDate: z.string(),
		committees: z
			.array(
				z.object({
					name: z.string(),
					systemCode: z.string(),
					url: z.string(),
				}),
			)
			.optional(),
		sourceSystem: z.object({
			code: z.number().int().nonnegative(),
			name: z.string(),
		}),
		text: z.string(),
		type: z.string(),
	})
	.catchall(z.unknown());

export const BillActionsResponseSchema = z.object({
	actions: z.array(BillActionsSchema),
	pagination: z.object({
		count: z.number().int().nonnegative(),
		next: z.string().optional(),
		prev: z.string().optional(),
	}),
	request: z.unknown(),
});

export type BillAction = z.infer<typeof BillActionsSchema>;
