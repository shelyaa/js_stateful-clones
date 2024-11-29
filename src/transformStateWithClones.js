'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const results = [];
  let currentState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties': {
        currentState = {
          ...currentState,
          ...action.extraData,
        };
        break;
      }

      case 'removeProperties': {
        currentState = { ...currentState };

        action.keysToRemove.forEach((key) => {
          delete currentState[key];
        });
        break;
      }

      case 'clear': {
        currentState = {};
        break;
      }

      default: {
        throw new Error(`Unknown action type ${action.type}`);
      }
    }

    results.push(currentState);
  }

  return results;
}

module.exports = transformStateWithClones;
