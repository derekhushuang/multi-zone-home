import React from 'react'
import Title from "../components/Title";
import { Header,Footer, requestHelper } from "@aaxis/share-components";


export default class Home extends React.Component{
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
                <Title />
                <div>
                    <a href='/blog'>Blog</a>
                </div>
                <div>
                    <a href="/about">About us</a>
                </div>
                <Footer content={this.props.htmlContent}/>
            </div>
        )
    }
}
