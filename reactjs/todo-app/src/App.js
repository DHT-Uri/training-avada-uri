import React, {useState} from 'react';
import {AppProvider, Frame, Page} from '@shopify/polaris';
import Todoes from "./components/Todoes";
import TopBar from "./components/TopBars"
import LoadingPageMarkup from "./components/loadingPage"

function App() {
    const [isLoading, setIsLoading] = useState(false);
    const actualPageMarkup = (
        <Page title="">
            <Todoes />
        </Page>
    );

    const pageMarkup = isLoading ? <LoadingPageMarkup /> : actualPageMarkup;

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
            >
                <Frame topBar={<TopBar />}>
                    {pageMarkup}
                </Frame>
            </AppProvider>
        </div>
    );
}
export default App;