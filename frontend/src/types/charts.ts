export interface CategoryDatum {
	id: string;
	category: string;
	value: number;
}

export interface ScatterPoint {
	id: string;
	x: number;
	y: number;
}

export interface ScatterGroup {
	id: string;
	name: string;
	data: ScatterPoint[];
}
