import React from 'react'
import {Footer, Header, requestHelper} from "@aaxis/share-components";

export default class About extends React.Component{
    static async getInitialProps(context) {

        const result = await requestHelper.fetch({
            uri: 'https://aaxisproducttest.azureedge.net//public/html/1393828675178.html',
            method: 'get',
        })
        return {
            htmlContent: result && result.data
        };
    }

    render() {
        return (
            <div>
                <Header />
                <p>This is the about page in home project.</p>
                <div><a href='/'>Go Back</a></div>
                <Footer content={this.props.htmlContent}/>
            </div>
        )
    }
}
