import React from 'react'
import {Footer, Header, requestHelper} from "@aaxis/share-components";
import _ from 'lodash'

export default class About extends React.Component{

    static async getInitialProps(context) {

        const footerReq = requestHelper.fetch({
            uri: 'https://aaxisproducttest.azureedge.net//public/html/1393828675178.html',
            method: 'get',
        });
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

        return {
            htmlContent: _.get(result, ['0','data'], ''),
            locationDetail: _.get(result, ['1', 'data'], {})
        };
    }

    render() {
        const aboutUs = _.get(this.props.locationDetail, ['location', 'originalLocationDetail', 'currentLocationBusiness', 'aboutUs'], {})
        return (
            <div>
                <Header />
                <p>This is the about page in <b>home project</b>.</p>
                <p><b>About Us Title:</b> {aboutUs.title}</p>
                <p><b>Description:</b> {aboutUs.description}</p>
                <div><a href='/'>Go Back</a></div>
                <Footer content={this.props.htmlContent}/>
            </div>
        )
    }
}
