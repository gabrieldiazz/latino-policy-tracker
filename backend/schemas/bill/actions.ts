import * as z from "zod";

export const BillActionsSchema = z.looseObject({
	actions: z.array(
		z.object({
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
		}),
	),
});
