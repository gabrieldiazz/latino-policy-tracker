import * as z from "zod";

export const BillSubjectsSchema = z.object({
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
});

export const BillSubjectsResponseSchema = z.object({
	subjects: BillSubjectsSchema,
	pagination: z.object({
		count: z.number().int().nonnegative(),
		next: z.string().optional(),
		prev: z.string().optional(),
	}),
	request: z.unknown(),
});

export type BillSubjects = z.infer<typeof BillSubjectsSchema>;
