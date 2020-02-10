import { SHOW_ICON } from "../constants/action-types";
import { HIDE_ICON } from "../constants/action-types";

export function showBackToTopIcon(payload) {
    return { type: SHOW_ICON, payload }
};

export function hideBackToTopIcon(payload) {
    return { type: HIDE_ICON, payload }
};