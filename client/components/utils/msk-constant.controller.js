angular.module("mishkaBeerApp").factory("$mskConstants",
    function () {
        return {
            // Malt types names/codes correspondance.
            maltTypes: [
                {
                    code: "malt",
                    name: "entities.malt.type.values.malt"
                },
                {
                    code: "raw",
                    name: "entities.malt.type.values.raw"
                },
                {
                    code: "sugar",
                    name: "entities.malt.type.values.sugar"
                }],
            // Mash necessary name/codes correspondance.
            mashNecessary: [
                {
                    code: true,
                    name: "entities.malt.mash.values.true"
                },
                {
                    code: false,
                    name: "entities.malt.mash.values.false"
                }]
        };
    });
