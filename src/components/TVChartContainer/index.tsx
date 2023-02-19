import * as React from 'react';
import { useEffect, useRef } from 'react';
import './index.css';
import {
	widget,
	ChartingLibraryWidgetOptions,
	LanguageCode,
	IChartingLibraryWidget,
	ResolutionString,
} from '../../charting_library';

export interface ChartContainerProps {
	symbol: ChartingLibraryWidgetOptions['symbol'];
	interval: ChartingLibraryWidgetOptions['interval'];

	// BEWARE: no trailing slash is expected in feed URL
	datafeedUrl: string;
	libraryPath: ChartingLibraryWidgetOptions['library_path'];
	chartsStorageUrl: ChartingLibraryWidgetOptions['charts_storage_url'];
	chartsStorageApiVersion: ChartingLibraryWidgetOptions['charts_storage_api_version'];
	clientId: ChartingLibraryWidgetOptions['client_id'];
	userId: ChartingLibraryWidgetOptions['user_id'];
	fullscreen: ChartingLibraryWidgetOptions['fullscreen'];
	autosize: ChartingLibraryWidgetOptions['autosize'];
	studiesOverrides: ChartingLibraryWidgetOptions['studies_overrides'];
	container: ChartingLibraryWidgetOptions['container'];
}

export function TVChartContainer({
	symbol = 'AAPL',
	interval = 'D' as ResolutionString,
	datafeedUrl = 'https://demo_feed.tradingview.com',
	libraryPath = '/charting_library/',
	chartsStorageUrl = 'https://saveload.tradingview.com',
	chartsStorageApiVersion = '1.1',
	clientId = 'tradingview.com',
	userId = 'public_user_id',
	fullscreen = false,
	autosize = true,
	studiesOverrides = {},
	container,
}: Partial<ChartContainerProps>): JSX.Element {
	const ref = useRef<HTMLDivElement>(null);

	function getLanguageFromURL(): LanguageCode | null {
		const regex = new RegExp('[\\?&]lang=([^&#]*)');
		const results = regex.exec(location.search);
		return results === null
			? null
			: (decodeURIComponent(results[1].replace(/\+/g, ' ')) as LanguageCode);
	}

	useEffect(() => {
		if (!ref.current) {
			return;
		}
		const widgetOptions: ChartingLibraryWidgetOptions = {
			symbol: symbol as string,
			// BEWARE: no trailing slash is expected in feed URL
			// tslint:disable-next-line:no-any
			datafeed: new (window as any).Datafeeds.UDFCompatibleDatafeed(datafeedUrl),

			interval: interval as ChartingLibraryWidgetOptions['interval'],
			container: ref.current,
			library_path: libraryPath as string,

			locale: getLanguageFromURL() || 'en',
			disabled_features: ['use_localstorage_for_settings'],
			enabled_features: ['study_templates'],
			charts_storage_url: chartsStorageUrl,
			charts_storage_api_version: chartsStorageApiVersion,
			client_id: clientId,
			user_id: userId,
			fullscreen: fullscreen,
			autosize: false,
			studies_overrides: studiesOverrides,
		};

		const tvWidget = new widget(widgetOptions);
		tvWidget.onChartReady(() => {
			tvWidget.headerReady().then(() => {
				const button = tvWidget.createButton();
				button.setAttribute('title', 'Click to show a notification popup');
				button.classList.add('apply-common-tooltip');
				button.addEventListener('click', () =>
					tvWidget.showNoticeDialog({
						title: 'Notification',
						body: 'TradingView Charting Library API works correctly',
						callback: () => {
							console.log('Noticed!');
						},
					}),
				);
				button.innerHTML = 'Check API';
			});
		});

		return () => {
			if (tvWidget !== null) {
				tvWidget.remove();
			}
		};
	}, [
		symbol,
		interval,
		datafeedUrl,
		libraryPath,
		chartsStorageUrl,
		chartsStorageApiVersion,
		clientId,
		userId,
		fullscreen,
		studiesOverrides,
	]);

	return <div ref={ref} className={'TVChartContainer'} />;
}

TVChartContainer.defaultProps = {
	symbol: 'AAPL',
	interval: 'D' as ResolutionString,
	datafeedUrl: 'https://demo_feed.tradingview.com',
	libraryPath: '/charting_library/',
	chartsStorageUrl: 'https://saveload.tradingview.com',
	chartsStorageApiVersion: '1.1',
	clientId: 'tradingview.com',
	userId: 'public_user_id',
	fullscreen: false,
	autosize: true,
	studiesOverrides: {},
};
