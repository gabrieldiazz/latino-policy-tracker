import * as z from "zod";

export const BillSubjectsSchema = z.looseObject({
	subjects: z.object({
		legislativeSubjects: z.array(
			z.object({
				name: z.string(),
				updateDate: z.string(),
			}),
		),
		policyArea: z.object({
			name: z.string(),
			updateDate: z.string(),
		}),
	}),
});
