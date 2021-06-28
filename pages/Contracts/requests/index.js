import React, {Component} from 'react';
import Layout from '../../../components/Layout';
import { Button,Table } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'
import { Link } from '../../../routes'
import Campaign from '../../../ethereum/campaign'
import RequestRow from '../../../components/RequestRow'



class RequestIndex extends Component {
  static async getInitialProps(props) {
    const { address } = props.query;
    const campaign = Campaign(address);
    const requestCount = await campaign.methods.getRequestsCount(0).call();

    const requests = await Promise.all(
      Array(parseInt(requestCount)).fill().map((element, index) => {
      return campaign.methods.requests(0, index).call();
      })
    );

    return { 
      address, requests, requestCount
    };
  }


  renderRow() {
    return this.props.requests.map((request, index) => {
      // console.log(request);

      return (
        <RequestRow
          key={index}
          id={index}
          request={request}
          address={this.props.address}
      />
      );
    });
  }

  render() {
    const {Header, Row, HeaderCell, Body} = Table;


    return (
      <Layout>
        <h3>Requests List!</h3>
        <Link route={`${this.props.address}/requests/new`}>
          <a>
            <Button primary floated='right' style={{marginBottom: 10}}>Add Request</Button>
          </a>
        </Link>
        <Table>
          <Header>
            <Row>
              <HeaderCell>ID</HeaderCell>
              <HeaderCell>Description</HeaderCell>
              <HeaderCell>Recipient</HeaderCell>
              <HeaderCell>Approved</HeaderCell>
            </Row>
          </Header>
          <Body>
            {this.renderRow()}
          </Body>
        </Table>
        <div>Found {this.props.requestCount} requests.</div>
      </Layout>
    );
  }
}

export default RequestIndex;