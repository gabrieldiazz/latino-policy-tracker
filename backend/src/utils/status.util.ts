import { Status } from "../models/bill.model";
import type { BillAction } from "../schemas/bill/actions.schema";

export function deriveBillStatus(actions: BillAction[]): Status {
	if (actions.length === 0) return Status.INTRODUCED;

	const validActions = actions.filter(
		(action) => action.actionCode !== undefined,
	);

	// Sort actions by date (oldest to newest)
	const sortedActions = [...validActions].sort(
		(a, b) =>
			new Date(`${a.actionDate}T${a.actionTime}`).getTime() -
			new Date(`${b.actionDate}T${b.actionTime}`).getTime(),
	);

	let status: Status = Status.INTRODUCED;

	for (const action of sortedActions) {
		switch (action.actionCode) {
			case "36000":
				status = Status.BECAME_LAW;
				break;
			case "39000": // Public Law enacted over veto
				status = Status.BECAME_LAW;
				break;
			case "31000":
				status = Status.VETOED;
				break;
			case "8000":
				status = Status.PASSED_HOUSE;
				break;
			case "17000":
				status = Status.PASSED_SENATE;
				break;
			case "20500": // senate actions: on website it says 20000, but actual data has 20500
				status = Status.RESOLVING_DIFFERENCES;
				break;
			case "19500": // house actions: on website it says 19000, but actual data has 19500
				status = Status.RESOLVING_DIFFERENCES;
				break;
			case "28000":
				status = Status.TO_PRESIDENT;
				break;
			case "33000": // Failed of passage in House over veto
				status = Status.FAILED_HOUSE;
				break;
			case "35000": // Failed of passage in Senate over veto
				status = Status.FAILED_SENATE;
				break;
			case "9000": // Failed of passage/not agreed to in House
				status = Status.FAILED_HOUSE;
				break;
			case "18000": // Failed of passage/not agreed to in Senate
				status = Status.FAILED_SENATE;
				break;
			case "1000": // Introduced in House
				status = Status.INTRODUCED;
				break;
			case "10000": // Introduced in Senate
				status = Status.INTRODUCED;
				break;
			// add more cases as needed
		}
	}

	return status;
}
