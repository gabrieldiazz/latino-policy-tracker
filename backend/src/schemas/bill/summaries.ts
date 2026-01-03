import * as z from "zod";

export const SummarizedBillSchema = z.looseObject({
	summaries: z.array(
		z.object({
			actionDate: z.string(),
			actionDesc: z.string(),
			text: z.string(),
			updateDate: z.string(),
			versionCode: z.string(),
		}),
	),
});
