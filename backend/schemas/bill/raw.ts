import * as z from "zod";

export const RawBillSchema = z.looseObject({
	bills: z.array(
		z.object({
			congress: z.number().int().nonnegative(),
			latestAction: z
				.object({
					actionDate: z.string(),
					text: z.string(),
				})
				.nullable(),
			number: z.string(),
			originChamber: z.string(),
			originChamberCode: z.string(),
			title: z.string(),
			type: z.string(),
			updateDate: z.string(),
			updateDateIncludingText: z.string(),
			url: z.string(),
		}),
	),
});
