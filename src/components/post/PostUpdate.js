import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import { getPost } from "../../actions/postActions";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { updatePost } from "../../actions/postActions";

class Post extends Component {
  componentDidMount() {
    this.props.getPost(this.props.match.params.id);
  }

  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: "",
      errors: {},
      updateSuccess: false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.post.updateSuccess) {
      this.props.history.push("/posts");
    }
    this.setState({
      title: nextProps.post.post.title,
      content: nextProps.post.post.content
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const newData = {
      id: this.props.match.params.id,
      title: this.state.title,
      content: this.state.content
    };

    this.props.updatePost(newData);
    this.setState({ title: "", content: "" });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { post, loading } = this.props.post;
    const { errors } = this.state;
    let postContent;
    console.log(errors);
    if (post === null || loading || Object.keys(post).length === 0) {
      postContent = <Spinner />;
    } else {
      postContent = (
        <div className="post">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <Link to="/posts" className="btn btn-light mb-3">
                  Back To Feed
                </Link>
              </div>
            </div>
            <hr />
            <div className="post-form mb-3 mt-5">
              <h2 className="text-center mx-2">Update Post</h2>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label for="title">Title</label>
                  <TextFieldGroup
                    placeholder="Title..."
                    name="title"
                    value={this.state.title}
                    onChange={this.onChange}
                    error={errors.title}
                  />
                  <label for="title">Content</label>
                  <TextAreaFieldGroup
                    placeholder="Content..."
                    name="content"
                    value={this.state.content}
                    onChange={this.onChange}
                    error={errors.content}
                  />
                </div>
                <button type="submit" className="btn btn-success">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      );
    }

    return postContent;
  }
}

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  post: state.post,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getPost, updatePost }
)(Post);
