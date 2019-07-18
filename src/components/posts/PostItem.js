import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deletePost } from "../../actions/postActions";

class PostItem extends Component {
  onDeleteClick(id) {
    this.props.deletePost(id);
  }

  render() {
    const { post, auth } = this.props;

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <a href="profile.html">
              <img
                className="rounded-circle d-none d-md-block"
                src="http://www.cybecys.com/wp-content/uploads/2017/07/no-profile.png"
                alt=""
              />
            </a>
            <br />
            <p className="text-center">{post.user.name}</p>
          </div>
          <div className="col-md-10">
            <h5>{post.title}</h5>
            <p className="lead">{post.content}</p>
            {post.user._id === auth.user.id || auth.user.role === "admin" ? (
              <span>
                <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                  View
                </Link>
                <Link
                  to={`/post/update/${post._id}`}
                  className="btn btn-primary mr-1"
                >
                  Update
                </Link>
                <button
                  onClick={this.onDeleteClick.bind(this, post._id)}
                  type="button"
                  className="btn btn-danger mr-1"
                >
                  Delete
                </button>
              </span>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  deletePost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deletePost }
)(PostItem);
