import React from 'react';
import * as $ from 'jquery';
import styles from './index.less';

/* eslint-disable */
if (!window.jQuery) {
  window.jQuery = $;
}
require('@ztree/ztree_v3/js/jquery.ztree.all');
/* eslint-enable */

class Tree extends React.Component {
  ztreeId = 'ztree_' + parseInt(Math.random() * 1e10);
  ztreeObj = null;
  componentDidMount() {
    this.initTree();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.nodes !== this.props.nodes) {
      this.initTree();
    }
  }

  initTree = () => {
    const ztreeSetting = {
      view: {
        showIcon: false, // default to hide icon
      },
      callback: {
        onAsyncError: (...arg) => {
          const { onAsyncError } = this.props;
          onAsyncError && onAsyncError(...arg);
        },
        onAsyncSuccess: (...arg) => {
          const { onAsyncSuccess } = this.props;
          onAsyncSuccess && onAsyncSuccess(...arg);
        },
        onCheck: (...arg) => {
          const { onCheck } = this.props;
          onCheck && onCheck(...arg);
        },
        onClick: (...arg) => {
          const { onClick } = this.props;
          onClick && onClick(...arg);
        },
        onCollapse: (...arg) => {
          const { onCollapse } = this.props;
          onCollapse && onCollapse(...arg);
        },
        onDblClick: (...arg) => {
          const { onDblClick } = this.props;
          onDblClick && onDblClick(...arg);
        },
        onDrag: (...arg) => {
          const { onDrag } = this.props;
          onDrag && onDrag(...arg);
        },
        onDragMove: (...arg) => {
          const { onDragMove } = this.props;
          onDragMove && onDragMove(...arg);
        },
        onDrop: (...arg) => {
          const { onDrop } = this.props;
          onDrop && onDrop(...arg);
        },
        onExpand: (...arg) => {
          const { onExpand } = this.props;
          onExpand && onExpand(...arg);
        },
        onMouseDown: (...arg) => {
          const { onMouseDown } = this.props;
          onMouseDown && onMouseDown(...arg);
        },
        onMouseUp: (...arg) => {
          const { onMouseUp } = this.props;
          onMouseUp && onMouseUp(...arg);
        },
        onRemove: (...arg) => {
          const { onRemove } = this.props;
          onRemove && onRemove(...arg);
        },
        onRename: (...arg) => {
          const { onRename } = this.props;
          onRename && onRename(...arg);
        },
        onRightClick: (...arg) => {
          const { onRightClick } = this.props;
          onRightClick && onRightClick(...arg);
        },
      },
    };
    // update tree
    if (this.ztreeObj) {
      this.ztreeObj.destroy();
    }
    this.ztreeObj = $.fn.zTree.init(
      $('#' + this.ztreeId),
      Object.assign({}, ztreeSetting, this.props.setting),
      this.props.nodes,
    );
    this.props.onMounted && this.props.onMounted(this.ztreeObj);
  };

  render() {
    return <div className={`ztree ${styles.ztree}`} id={this.ztreeId}></div>;
  }
}

export default Tree;
