import React from 'react'
// 5. shared components and shared function will be saved in shared repository
import {Footer, Header, requestHelper} from "@aaxis/share-components";
import _ from 'lodash'

const wcsResourceConfig = { footerResourceId: '1393828675178'}

export default class About extends React.Component{

    static async getInitialProps(context) {
        // 1: layout call

        // 2: wcs call (async call)
        //Q1: read layout response and then call wcs resource
        const footerReq = requestHelper.fetch({
            uri: `https://aaxisproducttest.azureedge.net//public/html/${wcsResourceConfig.footerResourceId}.html`,
            method: 'get',
        });
        // 3: api call
        const locationDetailReq = requestHelper.fetch({
            uri: 'https://headless-api.aaxisaws.com/api/location/branches/aurora-co-showroom',
            method: 'get',
        });
        let result = []
        try {
           result = await Promise.all([footerReq, locationDetailReq]);
        }catch (e) {
           console.log('request error:', e)
        }
        // 4. if we need read multi wcs resources, we will save the wcs resource with id, and get the resource by id.
        // for banner wcs content we can make them lazy loading
        return {
            wcsResources : {
                [wcsResourceConfig.footerResourceId] : _.get(result, ['0','data'], '')
            },
            locationDetail: _.get(result, ['1', 'data'], {})
        };
    }

    render() {
        const aboutUs = _.get(this.props.locationDetail, ['location', 'originalLocationDetail', 'currentLocationBusiness', 'aboutUs'], {})
        const footerContent = _.get(this.props.wcsResources, [wcsResourceConfig.footerResourceId], '');
        return (
            <div>
                <Header />
                <p>This is the about page in <b>home project</b>.</p>
                <p><b>About Us Title:</b> {aboutUs.title}</p>
                <p><b>Description:</b> {aboutUs.description}</p>
                <div><a href='/'>Go Back</a></div>
                <Footer content={footerContent}/>
            </div>
        )
    }
}
