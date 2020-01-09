import {
  AddNew,
  Body,
  Container,
  Header,
  HeaderAmount,
  Indicator,
  IndicatorItem,
  LoadingContent,
  StageFooter,
  StageRoot,
  StageTitle
} from 'modules/boards/styles/stage';
import Button from 'modules/common/components/Button';
import EmptyState from 'modules/common/components/EmptyState';
import Icon from 'modules/common/components/Icon';
import ModalTrigger from 'modules/common/components/ModalTrigger';
import { __ } from 'modules/common/utils';
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import PipelineSelector from '../../containers/PipelineSelector';
import { AddForm } from '../../containers/portable';
import {
  IFilterParams,
  IItem,
  IOptions,
  IStage,
  IStageRefetchParams
} from '../../types';
import { renderAmount } from '../../utils';
import ItemList from '../stage/ItemList';

type Props = {
  loadingItems: boolean;
  index: number;
  stage: IStage;
  length: number;
  items: IItem[];
  onAddItem: (stageId: string, item: IItem) => void;
  loadMore: () => void;
  options: IOptions;
  queryParams: IFilterParams;
  refetchStages: (params: IStageRefetchParams) => Promise<any>;
};
export default class Stage extends React.Component<Props, {}> {
  private bodyRef;

  constructor(props: Props) {
    super(props);

    this.bodyRef = React.createRef();
  }

  componentDidMount() {
    // Load items until scroll created
    const handle = setInterval(() => {
      const { current } = this.bodyRef;

      if (!current) {
        return;
      }

      const isScrolled = current.scrollHeight > current.clientHeight;

      if (isScrolled) {
        clearInterval(handle);
      }

      const { items, stage, loadMore } = this.props;

      if (items.length < stage.itemsTotalCount) {
        loadMore();
      } else {
        clearInterval(handle);
      }
    }, 1000);
  }

  onScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const bottom =
      target.scrollHeight - target.scrollTop === target.clientHeight;

    if (bottom) {
      this.props.loadMore();
    }
  };

  renderAddItemTrigger() {
    const { options, stage, onAddItem } = this.props;
    const addText = options.texts.addText;

    const trigger = (
      <StageFooter>
        <AddNew>
          <Icon icon="plus-1" />
          {__(addText)}
        </AddNew>
      </StageFooter>
    );

    const formProps = {
      options,
      showSelect: false,
      callback: (item: IItem) => onAddItem(stage._id, item),
      stageId: stage._id
    };

    const content = props => <AddForm {...props} {...formProps} />;

    return <ModalTrigger title={addText} trigger={trigger} content={content} />;
  }

  renderCopyMoveTrigger(type: string) {
    const { options, stage, refetchStages, queryParams } = this.props;

    let action: string = 'Copy';
    let icon: string = 'copy';
    let btnStyle: string = 'success';

    if (type === 'move') {
      action = 'Move';
      icon = 'move';
      btnStyle = 'default';
    }

    const trigger = <Button icon={icon} size="small" btnStyle={btnStyle} />;

    const formProps = {
      type: options.type,
      action,
      stageId: stage._id,
      refetchStages,
      currentPipelineId: queryParams.pipelineId
    };

    const content = props => <PipelineSelector {...props} {...formProps} />;

    return (
      <ModalTrigger
        title={`${action} "${stage.name}"`}
        trigger={trigger}
        content={content}
      />
    );
  }

  renderIndicator() {
    const index = this.props.index || 0;
    const length = this.props.length || 0;

    const data: any = [];

    for (let i = 0; i < length; i++) {
      data.push(<IndicatorItem isPass={index >= i} key={i} />);
    }

    return data;
  }

  shouldComponentUpdate(nextProps: Props) {
    const { stage, index, length, items, loadingItems } = this.props;

    if (
      index !== nextProps.index ||
      loadingItems !== nextProps.loadingItems ||
      length !== nextProps.length ||
      JSON.stringify(stage) !== JSON.stringify(nextProps.stage) ||
      JSON.stringify(items) !== JSON.stringify(nextProps.items)
    ) {
      return true;
    }

    return false;
  }

  renderItemList() {
    const { stage, items, loadingItems, options } = this.props;

    if (loadingItems) {
      return (
        <LoadingContent>
          <img alt="Loading" src="/images/loading-content.gif" />
        </LoadingContent>
      );
    }

    return (
      <ItemList
        listId={stage._id}
        stageId={stage._id}
        items={items}
        options={options}
      />
    );
  }

  render() {
    const { index, stage } = this.props;

    if (!stage) {
      return <EmptyState icon="clipboard" text="No stage" size="small" />;
    }

    return (
      <Draggable draggableId={stage._id} index={index}>
        {(provided, snapshot) => (
          <Container innerRef={provided.innerRef} {...provided.draggableProps}>
            <StageRoot isDragging={snapshot.isDragging}>
              <Header {...provided.dragHandleProps}>
                <StageTitle>
                  <div>
                    {stage.name}
                    <span>{stage.itemsTotalCount}</span>
                  </div>
                  <div>
                    {this.renderCopyMoveTrigger('copy')}
                    {this.renderCopyMoveTrigger('move')}
                  </div>
                </StageTitle>
                <HeaderAmount>{renderAmount(stage.amount)}</HeaderAmount>
                <Indicator>{this.renderIndicator()}</Indicator>
              </Header>
              <Body innerRef={this.bodyRef} onScroll={this.onScroll}>
                {this.renderItemList()}
              </Body>
              {this.renderAddItemTrigger()}
            </StageRoot>
          </Container>
        )}
      </Draggable>
    );
  }
}