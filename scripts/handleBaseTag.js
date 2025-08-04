import {getBaseUrl} from "../utils/getBaseUrl.js";

const base = document.createElement('base');
base.href = getBaseUrl();

document.head.prepend(base);
