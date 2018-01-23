import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { 
    createComment, 
    getComment, 
    updateComment 
} from '../actions/comments'
import { bindActionCreators } from 'redux'
import { renderField } from '../utils/helpers'
import NotFound from './NotFound'

class CommentEdit extends Component {
    constructor(props) {
        super(props)
        this.initialized = false;
    }

    componentWillMount() {
        console.log('this.props.commentId', this.props.commentId)
        if (this.props.commentId) {
            this.props.getComment(this.props.commentId)
        }
    }

    componentWillReceiveProps(newProps) {
        if (newProps.comment && !this.initialized) {
            this.initialized = true;
            this.props.initialize(newProps.comment)
        }
    }
    
    onSubmit(values) {
        if (this.props.comment) {
            this.props.updateComment(this.props.comment.id, values)
                .then(() => this.props.history.goBack())
        } else {
            const data = {
                ...values,
                parentId: this.props.parentId
            }

            this.props.createComment(data)
                .then(() => this.props.history.goBack())
        }
    }
    
    render() {
        const { handleSubmit } = this.props;
        console.log('this.props.comment', this.props.comment, this.props.comment != null, this.props.comment == null)
        return (
            <div className="container">
                {this.props.comment === null && <NotFound type='comment'/>}
                {this.props.comment !== null && 
                    (
                        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                            <Field
                                label="Content:"
                                name="body"
                                component={renderField}
                            />
                            {
                                !this.props.comment && 
                                (<Field
                                    label="Author:"
                                    name="author"
                                    component={renderField}
                                />)
                            }
                            <Button type="submit" bsStyle="primary">Submit</Button>
                            <Link to="/" className="btn btn-danger">Cancel</Link>
                        </form>
                    )
                }
            </div>
        );
    }
}

function validate(values) {
    const errors = {};
    
    if (!values.author) {
        errors.author = "Author is required."
    }
    
    if (!values.body) {
        errors.body = "Content is required."
    }
    
    return errors;
}

function mapStateToProps({ comments }, ownProps) {
    return { 
        comment: comments[ownProps.commentId]
    }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({ getComment, updateComment, createComment }, dispatch)

export default reduxForm({
    validate,
    form: 'CreateCommentForm'
})(
    connect(mapStateToProps, mapDispatchToProps)(CommentEdit)
)