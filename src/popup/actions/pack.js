import { ADD_PACKAGE,
				 REMOVE_PACKAGE,
         CHANGE_PACKAGE_COLORID,
         CHANGE_PACKAGE_TITLE,
         CHANGE_PACKAGE_DESCRIPTION,
         IS_CHANGING_COLOR,
				 IS_EDIT_PACKAGE,
				 CHANGE_TIME_PACKAGE,
         IS_EDITING_CARD,
				 REMOVE_CARD,
         CREATE_CARD,
         IS_SETTING } from '../constants/ActionTypes';

export function addPackage(value){
	  return {
		    type: ADD_PACKAGE,
        value
	  };
}

export function removePackage(id){
	return {
		type: REMOVE_PACKAGE,
		id
	};
}

export function changePackageTitle(id, value){
    return {
        type: CHANGE_PACKAGE_TITLE,
        value,
        id
    };
}

export function changePackageDescription(id, value){
    return {
        type: CHANGE_PACKAGE_DESCRIPTION,
        value,
        id
    };
}

export function changeColorID(value, id){
    return {
        type: CHANGE_PACKAGE_COLORID,
        value,
        id
    };
}

export function isChangingColor(value, id){
    return {
        type: IS_CHANGING_COLOR,
        value,
        id
    };
}

export function changeTimePackage(value, id){
	return {
		type: CHANGE_TIME_PACKAGE,
		value,
		id
	};
}


export function isSetting(value, id){
  return {
    type: IS_SETTING,
    value,
    id
  };
}

/*
** CARDS ACTIONS
*/

export function isEditingCard(value, prop, id, indexCard){
	  return {
		    type: IS_EDITING_CARD,
		    value,
        prop,
		    id,
        indexCard
	  };
}

export function removeCard(id, indexCard){
	return {
		type: REMOVE_CARD,
		id,
    indexCard
	};
}

export function createCard(id, idCard, value){
	  return {
		    type: CREATE_CARD,
		    id,
        idCard,
        value
	  };
}
