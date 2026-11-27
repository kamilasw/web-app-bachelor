import type { UserData } from '../types/segmentation';

// todo - use acutall user data from baceknd
export const userData: UserData = {
	users: [
		{
			userId: 'user-1',
			features: {
				ordersCount: 3,
				totalSpend: 1250,
				recencyDays: 23,
				averageOrderValue: 416.67,
			},
		},
		{
			userId: 'user-2',
			features: {
				ordersCount: 4,
				totalSpend: 1400,
				recencyDays: 15,
				averageOrderValue: 350,
			},
		},
		{
			userId: 'user-3',
			features: {
				ordersCount: 2,
				totalSpend: 850,
				recencyDays: 20,
				averageOrderValue: 425,
			},
		},
		{
			userId: 'user-4',
			features: {
				ordersCount: 3,
				totalSpend: 1100,
				recencyDays: 12,
				averageOrderValue: 366.67,
			},
		},
		{
			userId: 'user-5',
			features: {
				ordersCount: 4,
				totalSpend: 1597,
				recencyDays: 17,
				averageOrderValue: 399.25,
			},
		},
		{
			userId: 'user-6',
			features: {
				ordersCount: 12,
				totalSpend: 9600,
				recencyDays: 2,
				averageOrderValue: 800,
			},
		},
		{
			userId: 'user-7',
			features: {
				ordersCount: 10,
				totalSpend: 8100,
				recencyDays: 3,
				averageOrderValue: 810,
			},
		},
		{
			userId: 'user-8',
			features: {
				ordersCount: 9,
				totalSpend: 7200,
				recencyDays: 1,
				averageOrderValue: 800,
			},
		},
		{
			userId: 'user-9',
			features: {
				ordersCount: 10,
				totalSpend: 7658,
				recencyDays: 4,
				averageOrderValue: 765.8,
			},
		},
		{
			userId: 'user-10',
			features: {
				ordersCount: 5,
				totalSpend: 3200,
				recencyDays: 7,
				averageOrderValue: 640,
			},
		},
		{
			userId: 'user-11',
			features: {
				ordersCount: 6,
				totalSpend: 3900,
				recencyDays: 10,
				averageOrderValue: 650,
			},
		},
		{
			userId: 'user-12',
			features: {
				ordersCount: 5,
				totalSpend: 3100,
				recencyDays: 8,
				averageOrderValue: 620,
			},
		},
	],
};
