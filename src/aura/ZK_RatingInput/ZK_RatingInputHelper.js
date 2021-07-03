({
    setRating: function (component, rate, temp) {
        const readOnly = component.get('v.readOnly');
        if (readOnly){
            return;
        }

        if (temp) {
            component.set('v.tempRating', rate);
        }
        else {
            component.set('v.rating', rate);
        }

    }
});