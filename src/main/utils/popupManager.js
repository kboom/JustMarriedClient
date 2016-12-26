import extend from 'lodash/extend';
import pick from 'lodash/pick';
import map from 'lodash/map';
import keys from 'lodash/keys';

const defaultPopupSpec = {
  width: 300,
  height: 300,
  modal: 'yes',
  alwaysRaised: 'yes',
  status: 'no',
  resizable: 'yes',
  toolbar: 'no',
  menubar: 'no',
  scrollbars: 'no',
  location: 'no',
  directories: 'no',
};

function parseStaticConfig(popupSpec) {
  const staticProps = pick(popupSpec, 'modal', 'alwaysRaised', 'status', 'resizable',
        'toolbar', 'menubar', 'scrollbars', 'location', 'directories');
  return map(keys(staticProps), (name) => `${name}=${popupSpec[name]}`).join(',');
}

function openInPopup(url, callback, customSpec) {
  const popupSpec = extend({}, defaultPopupSpec, customSpec);

  let leftPosition,
    topPosition;
  leftPosition = (window.screen.width / 2) - ((popupSpec.width / 2) + 10);
  topPosition = (window.screen.height / 2) - ((popupSpec.height / 2) + 50);

  const win = window.open(`${url}?redirectTo=/redirect.html`, '_blank',
        `${parseStaticConfig(popupSpec)},left=${leftPosition},top=${topPosition},screenX=${leftPosition},screenY=${topPosition}`
    );
  win.onload = function () {
    callback(win.retrieveAuthentication());
  };
}

export { openInPopup };