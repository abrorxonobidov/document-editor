const initialConfig = {
    polyId: 'outbox-orientation',
    values: {
        portrait: 1,
        landscape: 2
    },
    containerId: 'editor'
}

CKEDITOR.plugins.add('orientation', {
    icons: 'orientation',
    init: function (editor) {
        editor.ui.addButton('Orientation', {
            label: 'Change orientation',
            command: 'ChangeOrientation',
        });
        editor.addCommand('ChangeOrientation', {
            exec: e => {
                let newConfig = e.config;
                let oConfig = e.config.orientationConfig;
                if (!oConfig) oConfig = initialConfig;
                let oClass = (e.config.bodyClass.indexOf('landscape') > 0) ? 'portrait' : 'landscape';
                newConfig.bodyClass = 'document-editor ' + oClass;
                CKEDITOR.instances[oConfig.containerId].destroy();
                CKEDITOR.replace(oConfig.containerId, newConfig);
                let oPoly = document.getElementById(oConfig.polyId);
                if (oPoly !== null) oPoly.value = oConfig.values[oClass];
            }
        });
    }
});