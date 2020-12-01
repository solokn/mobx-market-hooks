import React from 'react';
import { useObserver } from 'mobx-react';
import _ from 'lodash';
import useStore from 'useStore';
import { PcItemList } from 'page/pc';
import './PcTemplate.css';

const PcTemplate = (props) => {

  const { user } = useStore();

  const onStartPc = (num) => {
    props.modal.current.show({
      content: `${num}번 PC 사용을 시작 하시겠습니까?`,
      isConfirm: true,
      onOk: () => {
        props.onLoading();
        user.pcStart(num);
      }
    });
  };

  const onEndPc = (num) => {
    props.modal.current.show({
      content: `${num}번 PC 사용을 종료 하시겠습니까?`,
      isConfirm: true,
      onOk: () => user.pcEnd(num)
    });
  };

  return useObserver(() => {
    const items = _.map(_.range(user.pcCount), item => {
      const pc = item + 1;
      const userObj = _.find(user.pcUserList, s => s.pc === pc);
      return {
        pc,
        ...userObj
      }
    });

    const startPc = _.filter(user.pcUserList, f => f.state).length;
    return (
      <>
        <p style={{ paddingLeft: '20px' }}>
          전체 PC : {user.pcCount} 대<br />
          가동 PC : {startPc} 대<br />
          종료 PC : {user.pcCount - startPc} 대
        </p>
        <div className="PcTemplate">
          <PcItemList
            {...props}
            items={items}
            onStartPc={onStartPc}
            onEndPc={onEndPc}
          />
        </div>
      </>
    );
  });
}

export default PcTemplate;