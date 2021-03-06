import React, { Component, PropTypes } from 'react';
import { List, ListItem } from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon';
import SectionHeader from '../SectionHeader';
import ExpandableIconElement from '../ExpandableIconElement';
import TaskFinder from '../TaskFinder';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import Task from '../../core/models/task.model';
import ConditionalRenderer from '../../utils/ConditionalRenderer';
import noop from 'lodash/noop';

const ICONS_BY_STATUS = {
  done: 'done',
  pending: 'schedule',
  blocked: 'lock_outline',
};

const focusElement = (element) => { // eslint-disable-line
  if (element) {
    element.focus();
  }
};

class RelatedTasks extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    isEditable: PropTypes.bool,
    toTask: PropTypes.instanceOf(Task).isRequired,
    relatedTasksSelector: PropTypes.func.isRequired,
    unrelatedTasksSelector: PropTypes.func.isRequired,
    onTaskAdded: PropTypes.func.isRequired,
    onTaskRemoved: PropTypes.func.isRequired,
    onTaskSelected: PropTypes.func,

    /**
     * Set internally by connect.
     */
    relatedTasks: PropTypes.instanceOf(Immutable.Seq).isRequired,
    unrelatedTasks: PropTypes.instanceOf(Immutable.Seq).isRequired,
  };

  static defaultProps = {
    onTaskSelected: noop,
  };

  constructor() {
    super();
    this.state = {
      addingTask: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isEditable && this.state.addingTask) {
      this.toggleAddTask();
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.addingTask && nextState.isEditable) {
      this.taskFinder.focus();
    }
  }

  toggleAddTask = () => {
    this.setState((prevState) => ({
      addingTask: !prevState.addingTask,
    }));
  };

  handleTaskAdded = (addedTask) => {
    this.props.onTaskAdded(addedTask);
    this.taskFinder.reset();
    // necessary to allow modal windows adjust height
    setTimeout(() => window.dispatchEvent(new Event('resize')));
  };

  render() {
    const { isEditable, title, relatedTasks,
      unrelatedTasks, onTaskSelected } = this.props;

    const renderTaskListItems = () => {
      const renderTaskRightIcon = (relatedTask) => isEditable // eslint-disable-line
          ? <FontIcon
            onClick={() => this.props.onTaskRemoved(relatedTask)}
            className="material-icons"
          >remove</FontIcon>
          : <FontIcon
            className="material-icons"
          >{ICONS_BY_STATUS[relatedTask.status]}</FontIcon>;

      return relatedTasks.map(
        (relatedTask) => <div key={relatedTask.id}>
          <ListItem
            onClick={() => onTaskSelected(relatedTask)}
            primaryText={relatedTask.name}
            rightIcon={renderTaskRightIcon(relatedTask)}
            leftIcon={<img
              role="presentation"
              src="http://meetingking.com/wp-content/images/meetingking_tasks.png"
            />}
          />
        </div>
      );
    };

    const renderTaskAddInput = () =>
      <ConditionalRenderer show={isEditable}>
        <ExpandableIconElement
          expanded={this.state.addingTask}
          icon={<FontIcon
            onClick={() => this.toggleAddTask()}
            className="material-icons"
          >{this.state.addingTask ? 'cancel' : 'add'}</FontIcon>}
        >
          <TaskFinder
            ref={(taskFinder) => { this.taskFinder = taskFinder; }}
            tasksToChooseFrom={unrelatedTasks}
            onTaskSelection={(task) => this.handleTaskAdded(task)}
          />
        </ExpandableIconElement>
      </ConditionalRenderer>;

    return (
      <div>
        <SectionHeader
          title={title}
          hideTitle={this.state.addingTask}
          rightIcon={renderTaskAddInput()}
        />
        <List>
          {
            relatedTasks.size > 0 ? renderTaskListItems() : <ListItem>None</ListItem>
          }
        </List>
      </div>
    );
  }

}

export default connect(
  (state, props) => ({
    relatedTasks: props.relatedTasksSelector(props.toTask)(state),
    unrelatedTasks: props.unrelatedTasksSelector(props.toTask)(state),
  }),
  () => ({})
)(RelatedTasks);

