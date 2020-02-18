import { BlockEvent } from '../../transformers/event.data';
import { VariableAction, ActionType } from '../actions';

export const deleteUnusedVariables = (event: BlockEvent): VariableAction[] => {
  const { variables } = event;
  return variables
    .filter((v) => !v.isBeingUsed)
    .map((v) => {
      return {
        variableId: v.id,
        actionType: 'delete',
        type: ActionType.DELETE_VARIABLE
      };
    });
};
