import React from 'react';
import {AppProvider} from '@shopify/polaris';
import AppLayout from "./layout/AppLayout";
import {BrowserRouter} from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import Routes from "./routes/routes";
import Link from "./components/Link";
import {createBrowserHistory} from 'history';

const history = createBrowserHistory();

function App() {
    return (
        <div style={{height: '500px'}}>
            <AppProvider
                theme={{
                    logo: {
                        width: 105,
                        topBarSource: 'https://cdn1.avada.io/logo/avada_logo_final_color.png',
                        url: 'https://www.figma.com/file/txDpLQBva5ERpLoePQMXam/Avada-Training-Docs?node-id=0%3A1',
                        accessibilityLabel: 'User',
                    }}
                }
                i18n={{}}
                linkComponent={Link}
            >
                <BrowserRouter history={history}>
                    <AppLayout>
                        <ErrorBoundary>
                            <Routes/>
                        </ErrorBoundary>
                    </AppLayout>
                </BrowserRouter>
            </AppProvider>
        </div>
    );
}
export default App;