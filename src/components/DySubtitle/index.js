import './index.less';

export const DySubtitle = (props) => {
  return (
    <div className={`block-title-sub ${props.size||''}`}>
      <div />
      <span>{props.title}</span>
      <i />
    </div>
  );
};
