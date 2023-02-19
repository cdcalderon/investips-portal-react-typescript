import React from 'react';

import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight,
	SubheaderSeparator,
} from '../../../layout/SubHeader/SubHeader';
import Page from '../../../layout/Page/Page';
import Popovers from '../../../components/bootstrap/Popovers';
import { TVChartContainer } from '../../../components/TVChartContainer/index';
import { version } from '../../../charting_library';

const DashboardPage = () => {
	return (
		<PageWrapper title='Dashboard Page'>
			<Page>
				<div className='row'>
					<div className='col-12 mb-3'>
						<div className={'App'}>
							<header className={'App-header'}>
								<h1 className={'App-title'}>
									TradingView Charting Library and React Integration Example{' '}
									{version()}
								</h1>
							</header>
							<TVChartContainer symbol='MSFT' />
						</div>
					</div>
				</div>
			</Page>
		</PageWrapper>
	);

	// return (
	// 	<PageWrapper title='Dashboard Page'>
	// 		<SubHeader>
	// 			<SubHeaderLeft>
	// 				<Popovers
	// 					title='DashboardPage.tsx'
	// 					desc={<code>src/pages/presentation/dashboard/DashboardPage.tsx</code>}>
	// 					SubHeaderLeft
	// 				</Popovers>
	// 				<code>DashboardPage.tsx</code>
	// 				<SubheaderSeparator />
	// 			</SubHeaderLeft>
	// 			<SubHeaderRight>
	// 				<Popovers
	// 					title='DashboardPage.tsx'
	// 					desc={<code>src/pages/presentation/dashboard/DashboardPage.tsx</code>}>
	// 					SubHeaderRight
	// 				</Popovers>
	// 				<code>DashboardPage.tsx</code>
	// 			</SubHeaderRight>
	// 		</SubHeader>
	// 		<Page>
	// 			<div className='row'>
	// 				<div className='col-12 mb-3'>
	// 					<Popovers
	// 						title='DashboardPage.tsx'
	// 						desc={<code>src/pages/presentation/dashboard/DashboardPage.tsx</code>}>
	// 						Page
	// 					</Popovers>
	// 					<code className='ps-3'>DashboardPage.tsx</code>
	// 				</div>
	// 			</div>
	// 		</Page>
	// 	</PageWrapper>
	// );
};

export default DashboardPage;
