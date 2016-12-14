import React, {Component, PropTypes} from "react";
import { Grid, Row, Col } from 'react-flexbox-grid'
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField'

export default class LoginForm extends Component {


    render() {
        return (
            <div>
                <Grid>
                    <Row>
                        <Col xs={6} md={3}>
                            <TextField
                                hintText="Login"/>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={6} md={3}>
                            <TextField
                                hintText="Password"/>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={6} md={3}>
                            <RaisedButton label="Login"/>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }

}