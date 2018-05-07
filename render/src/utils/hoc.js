
import React from 'react';


function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName ||
        WrappedComponent.name || 'Component';
}

function inject(Component, injectProps, name) {
    const HOC = (props) => <Component {...props} {...injectProps} />;
    HOC.displayName = name || `HOC${getDisplayName(Component)}`;
    return HOC;
}


export {
    inject,
    getDisplayName
};
