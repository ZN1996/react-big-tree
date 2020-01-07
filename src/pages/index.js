import React from 'react';
import { Input } from 'antd';
import styles from './index.less';
import Tree from '@/components/tree';
import fuzzySearch from '@/components/tree/fuzzysearch';
const bigData = require('@/mock/big-tree.json');
const { Search } = Input;
const simpleData = [
  { id: 1, pid: 0, name: '随意勾选 1', open: true },
  { id: 11, pid: 1, name: '随意勾选 1-1', open: true },
  { id: 111, pid: 11, name: '随意勾选 1-1-1' },
  { id: 112, pid: 11, name: '随意勾选 1-1-2' },
  { id: 12, pid: 1, name: '随意勾选 1-2', open: true },
  { id: 121, pid: 12, name: '随意勾选 1-2-1' },
  { id: 122, pid: 12, name: '随意勾选 1-2-2' },
  { id: 2, pid: 0, name: '随意勾选 2', checked: true, open: true },
  { id: 21, pid: 2, name: '随意勾选 2-1' },
  { id: 22, pid: 2, name: '随意勾选 2-2', open: true },
  { id: 221, pid: 22, name: '随意勾选 2-2-1', checked: true },
  { id: 222, pid: 22, name: '随意勾选 2-2-2' },
  { id: 23, pid: 2, name: '随意勾选 2-3' },
];
const dataQueue = [bigData.data, simpleData];

export default function() {
  const [showIndex, setShowIndex] = React.useState(0);
  const [nodes, setNodes] = React.useState(dataQueue[showIndex]);
  const [ztreeObj, setZtreeObj] = React.useState(null);
  const onMounted = nextZtreeObj => {
    console.log('ztreeObj: ', nextZtreeObj);
    setZtreeObj(nextZtreeObj);
    // TODO: 添加模糊搜索功能
    // eslint-disable-next-line
    fuzzySearch(nextZtreeObj.setting.treeId, '#treeSearch', null, true);
  };
  const onClick = (evt, treeId, treeNode) => {
    // 点击事件
    // console.log(evt.type, treeNode);
  };
  const onCheck = (evt, treeId, treeNode) => {
    // 选中事件
    // console.log(evt.type, treeNode);
    if (ztreeObj) {
      const nextNodes = ztreeObj.getCheckedNodes(true);
      console.log('nextNodes: ', nextNodes);
    }
  };
  const updateData = () => {
    const nextShowIndex = showIndex === 0 ? 1 : 0;
    const nextNodes = dataQueue[nextShowIndex];
    setShowIndex(nextShowIndex);
    setNodes(nextNodes);
  };

  const addHoverDom = (treeid, treeNode) => {
    const item = document.getElementById(`${treeNode.tId}_a`);
    if (item && !item.querySelector('.tree_extra_btn')) {
      const btn = document.createElement('sapn');
      btn.id = `${treeid}_${treeNode.id}_btn`;
      btn.classList.add('tree_extra_btn');
      btn.innerText = '删除';
      btn.addEventListener('click', e => {
        e.stopPropagation();
        clickRemove(treeNode);
      });
      item.appendChild(btn);
    }
  };

  const removeHoverDom = (treeid, treeNode) => {
    const item = document.getElementById(`${treeNode.tId}_a`);
    if (item) {
      const btn = item.querySelector('.tree_extra_btn');
      if (btn) {
        item.removeChild(btn);
      }
    }
  };

  const clickRemove = treeNode => {
    console.log('remove', treeNode);
    ztreeObj && ztreeObj.removeNode(treeNode);
  };

  const treeConfig = {
    setting: {
      check: {
        enable: true,
      },
      data: {
        simpleData: {
          enable: true,
          pIdKey: 'pid',
        },
      },
      view: {
        showIcon: false,
        addHoverDom: addHoverDom,
        removeHoverDom: removeHoverDom,
      },
    },
    nodes,
    onClick,
    onCheck,
    onMounted,
  };
  return (
    <div className={styles.normal}>
      <div className={styles.treeOuter}>
        <Search id="treeSearch" />
        <div className={styles.treeWrapper}>
          <Tree {...treeConfig} />
        </div>
      </div>

      <div className="toolbar">
        <button className="btn" type="button" onClick={updateData}>
          更新数据
        </button>
      </div>
    </div>
  );
}
