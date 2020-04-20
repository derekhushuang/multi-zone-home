import React from 'react'
import Title from "../components/Title";
import { Header,Footer, requestHelper } from "@aaxis/share-components";
import _ from "lodash";
import asset from "next/asset";

const wcsResourceConfig = { footerResourceId: '1393828675178'}

export default class Home extends React.Component{
    static async getInitialProps(context) {

        const result = await requestHelper.fetch({
            uri: `https://aaxisproducttest.azureedge.net//public/html/${wcsResourceConfig.footerResourceId}.html`,
            method: 'get',
        })
        return {
            wcsResources : {
                [wcsResourceConfig.footerResourceId] : _.get(result, 'data', '')
            }
        };
    }

    render() {
        const footerContent = _.get(this.props.wcsResources, [wcsResourceConfig.footerResourceId], '');
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
                <img width={200} src={asset("/nextjs.png")} />
                <Footer content={footerContent}/>
            </div>
        )
    }
}
