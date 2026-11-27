export type VisualizationWidgetType = 'bar' | 'pie' | 'scatter' | 'metric';

export type WidgetType = VisualizationWidgetType | 'text';

export interface Widget {
	widget_id: string;
	client_id: string;
	run_id: string;
	name: string;
	type: VisualizationWidgetType;
	x_label: string;
	y_label: string;
}

export type WidgetFormData = Omit<Widget, 'widget_id' | 'client_id'>;

export type WidgetSelection =
	| {
			type: 'cluster';
			clusterId: number;
	  }
	| {
			type: 'customer';
			clusterId: number;
			userId: string;
	  };
