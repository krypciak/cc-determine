#!/bin/node
import { startCrossnode } from '../crossnode/crossnode.js'
startCrossnode({
    test: true,
    ccloader2: true,
    nukeImageStack: true,

    modWhitelist: ['cc-determine'],
    extensionWhitelist: [],
    modTestWhitelist: ['cc-determine'],
})
