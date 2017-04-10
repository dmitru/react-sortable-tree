!function(root, factory) {
    "object" == typeof exports && "object" == typeof module ? module.exports = factory(require("react"), require("lodash.isequal"), require("react-dnd"), require("react-dnd-html5-backend"), require("react-dnd-scrollzone"), require("react-virtualized")) : "function" == typeof define && define.amd ? define([ "react", "lodash.isequal", "react-dnd", "react-dnd-html5-backend", "react-dnd-scrollzone", "react-virtualized" ], factory) : "object" == typeof exports ? exports.ReactSortableTree = factory(require("react"), require("lodash.isequal"), require("react-dnd"), require("react-dnd-html5-backend"), require("react-dnd-scrollzone"), require("react-virtualized")) : root.ReactSortableTree = factory(root.react, root["lodash.isequal"], root["react-dnd"], root["react-dnd-html5-backend"], root["react-dnd-scrollzone"], root["react-virtualized"]);
}(this, function(__WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_26__, __WEBPACK_EXTERNAL_MODULE_27__, __WEBPACK_EXTERNAL_MODULE_28__, __WEBPACK_EXTERNAL_MODULE_29__, __WEBPACK_EXTERNAL_MODULE_30__) {
    /******/
    return function(modules) {
        /******/
        /******/
        // The require function
        /******/
        function __webpack_require__(moduleId) {
            /******/
            /******/
            // Check if module is in cache
            /******/
            if (installedModules[moduleId]) /******/
            return installedModules[moduleId].exports;
            /******/
            /******/
            // Create a new module (and put it into the cache)
            /******/
            var module = installedModules[moduleId] = {
                /******/
                exports: {},
                /******/
                id: moduleId,
                /******/
                loaded: !1
            };
            /******/
            /******/
            // Return the exports of the module
            /******/
            /******/
            /******/
            // Execute the module function
            /******/
            /******/
            /******/
            // Flag the module as loaded
            /******/
            return modules[moduleId].call(module.exports, module, module.exports, __webpack_require__), 
            module.loaded = !0, module.exports;
        }
        // webpackBootstrap
        /******/
        // The module cache
        /******/
        var installedModules = {};
        /******/
        /******/
        // Load entry module and return exports
        /******/
        /******/
        /******/
        /******/
        // expose the modules object (__webpack_modules__)
        /******/
        /******/
        /******/
        // expose the module cache
        /******/
        /******/
        /******/
        // __webpack_public_path__
        /******/
        return __webpack_require__.m = modules, __webpack_require__.c = installedModules, 
        __webpack_require__.p = "", __webpack_require__(0);
    }([ /* 0 */
    /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.SortableTreeWithoutDndContext = void 0;
        var _defaultHandlers = __webpack_require__(5);
        Object.keys(_defaultHandlers).forEach(function(key) {
            "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                enumerable: !0,
                get: function() {
                    return _defaultHandlers[key];
                }
            });
        });
        var _treeDataUtils = __webpack_require__(1);
        Object.keys(_treeDataUtils).forEach(function(key) {
            "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                enumerable: !0,
                get: function() {
                    return _treeDataUtils[key];
                }
            });
        });
        var _reactSortableTree = __webpack_require__(8), _reactSortableTree2 = _interopRequireDefault(_reactSortableTree);
        exports.default = _reactSortableTree2.default, // Export the tree component without the react-dnd DragDropContext,
        // for when component is used with other components using react-dnd.
        // see: https://github.com/gaearon/react-dnd/issues/186
        exports.SortableTreeWithoutDndContext = _reactSortableTree.SortableTreeWithoutDndContext;
    }, /* 1 */
    /***/
    function(module, exports) {
        "use strict";
        function _toConsumableArray(arr) {
            if (Array.isArray(arr)) {
                for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];
                return arr2;
            }
            return Array.from(arr);
        }
        /**
	 * Performs a depth-first traversal over all of the node descendants,
	 * incrementing currentIndex by 1 for each
	 */
        function getNodeDataAtTreeIndexOrNextIndex(_ref) {
            var targetIndex = _ref.targetIndex, node = _ref.node, currentIndex = _ref.currentIndex, getNodeKey = _ref.getNodeKey, _ref$path = _ref.path, path = void 0 === _ref$path ? [] : _ref$path, _ref$lowerSiblingCoun = _ref.lowerSiblingCounts, lowerSiblingCounts = void 0 === _ref$lowerSiblingCoun ? [] : _ref$lowerSiblingCoun, _ref$ignoreCollapsed = _ref.ignoreCollapsed, ignoreCollapsed = void 0 === _ref$ignoreCollapsed || _ref$ignoreCollapsed, _ref$isPseudoRoot = _ref.isPseudoRoot, isPseudoRoot = void 0 !== _ref$isPseudoRoot && _ref$isPseudoRoot, selfPath = isPseudoRoot ? [] : [].concat(_toConsumableArray(path), [ getNodeKey({
                node: node,
                treeIndex: currentIndex
            }) ]);
            // Return target node when found
            if (currentIndex === targetIndex) return {
                node: node,
                lowerSiblingCounts: lowerSiblingCounts,
                path: selfPath
            };
            // Add one and continue for nodes with no children or hidden children
            if (!node.children || ignoreCollapsed && node.expanded !== !0) return {
                nextIndex: currentIndex + 1
            };
            for (var childIndex = currentIndex + 1, childCount = node.children.length, i = 0; i < childCount; i++) {
                var result = getNodeDataAtTreeIndexOrNextIndex({
                    ignoreCollapsed: ignoreCollapsed,
                    getNodeKey: getNodeKey,
                    targetIndex: targetIndex,
                    node: node.children[i],
                    currentIndex: childIndex,
                    lowerSiblingCounts: [].concat(_toConsumableArray(lowerSiblingCounts), [ childCount - i - 1 ]),
                    path: selfPath
                });
                if (result.node) return result;
                childIndex = result.nextIndex;
            }
            // If the target node is not found, return the farthest traversed index
            return {
                nextIndex: childIndex
            };
        }
        function getDescendantCount(_ref2) {
            var node = _ref2.node, _ref2$ignoreCollapsed = _ref2.ignoreCollapsed, ignoreCollapsed = void 0 === _ref2$ignoreCollapsed || _ref2$ignoreCollapsed;
            return getNodeDataAtTreeIndexOrNextIndex({
                getNodeKey: function() {},
                ignoreCollapsed: ignoreCollapsed,
                node: node,
                currentIndex: 0,
                targetIndex: -1
            }).nextIndex - 1;
        }
        /**
	 * Walk all descendants of the given node, depth-first
	 *
	 * @param {Object} args - Function parameters
	 * @param {function} args.callback - Function to call on each node
	 * @param {function} args.getNodeKey - Function to get the key from the nodeData and tree index
	 * @param {boolean} args.ignoreCollapsed - Ignore children of nodes without `expanded` set to `true`
	 * @param {boolean=} args.isPseudoRoot - If true, this node has no real data, and only serves
	 *                                        as the parent of all the nodes in the tree
	 * @param {Object} args.node - A tree node
	 * @param {Object=} args.parentNode - The parent node of `node`
	 * @param {number} args.currentIndex - The treeIndex of `node`
	 * @param {number[]|string[]} args.path - Array of keys leading up to node to be changed
	 * @param {number[]} args.lowerSiblingCounts - An array containing the count of siblings beneath the
	 *                                             previous nodes in this path
	 *
	 * @return {number|false} nextIndex - Index of the next sibling of `node`,
	 *                                    or false if the walk should be terminated
	 */
        function walkDescendants(_ref3) {
            var callback = _ref3.callback, getNodeKey = _ref3.getNodeKey, ignoreCollapsed = _ref3.ignoreCollapsed, _ref3$isPseudoRoot = _ref3.isPseudoRoot, isPseudoRoot = void 0 !== _ref3$isPseudoRoot && _ref3$isPseudoRoot, node = _ref3.node, _ref3$parentNode = _ref3.parentNode, parentNode = void 0 === _ref3$parentNode ? null : _ref3$parentNode, currentIndex = _ref3.currentIndex, _ref3$path = _ref3.path, path = void 0 === _ref3$path ? [] : _ref3$path, _ref3$lowerSiblingCou = _ref3.lowerSiblingCounts, lowerSiblingCounts = void 0 === _ref3$lowerSiblingCou ? [] : _ref3$lowerSiblingCou, selfPath = isPseudoRoot ? [] : [].concat(_toConsumableArray(path), [ getNodeKey({
                node: node,
                treeIndex: currentIndex
            }) ]), selfInfo = isPseudoRoot ? null : {
                node: node,
                parentNode: parentNode,
                path: selfPath,
                lowerSiblingCounts: lowerSiblingCounts,
                treeIndex: currentIndex
            };
            if (!isPseudoRoot) {
                var callbackResult = callback(selfInfo);
                // Cut walk short if the callback returned false
                if (callbackResult === !1) return !1;
            }
            // Return self on nodes with no children or hidden children
            if (!node.children || node.expanded !== !0 && ignoreCollapsed && !isPseudoRoot) return currentIndex;
            // Get all descendants
            var childIndex = currentIndex, childCount = node.children.length;
            if ("function" != typeof node.children) for (var i = 0; i < childCount; i++) // Cut walk short if the callback returned false
            if (childIndex = walkDescendants({
                callback: callback,
                getNodeKey: getNodeKey,
                ignoreCollapsed: ignoreCollapsed,
                node: node.children[i],
                parentNode: isPseudoRoot ? null : node,
                currentIndex: childIndex + 1,
                lowerSiblingCounts: [].concat(_toConsumableArray(lowerSiblingCounts), [ childCount - i - 1 ]),
                path: selfPath
            }), childIndex === !1) return !1;
            return childIndex;
        }
        /**
	 * Perform a change on the given node and all its descendants, traversing the tree depth-first
	 *
	 * @param {Object} args - Function parameters
	 * @param {function} args.callback - Function to call on each node
	 * @param {function} args.getNodeKey - Function to get the key from the nodeData and tree index
	 * @param {boolean} args.ignoreCollapsed - Ignore children of nodes without `expanded` set to `true`
	 * @param {boolean=} args.isPseudoRoot - If true, this node has no real data, and only serves
	 *                                        as the parent of all the nodes in the tree
	 * @param {Object} args.node - A tree node
	 * @param {Object=} args.parentNode - The parent node of `node`
	 * @param {number} args.currentIndex - The treeIndex of `node`
	 * @param {number[]|string[]} args.path - Array of keys leading up to node to be changed
	 * @param {number[]} args.lowerSiblingCounts - An array containing the count of siblings beneath the
	 *                                             previous nodes in this path
	 *
	 * @return {number|false} nextIndex - Index of the next sibling of `node`,
	 *                                    or false if the walk should be terminated
	 */
        function mapDescendants(_ref4) {
            var callback = _ref4.callback, getNodeKey = _ref4.getNodeKey, ignoreCollapsed = _ref4.ignoreCollapsed, _ref4$isPseudoRoot = _ref4.isPseudoRoot, isPseudoRoot = void 0 !== _ref4$isPseudoRoot && _ref4$isPseudoRoot, node = _ref4.node, _ref4$parentNode = _ref4.parentNode, parentNode = void 0 === _ref4$parentNode ? null : _ref4$parentNode, currentIndex = _ref4.currentIndex, _ref4$path = _ref4.path, path = void 0 === _ref4$path ? [] : _ref4$path, _ref4$lowerSiblingCou = _ref4.lowerSiblingCounts, lowerSiblingCounts = void 0 === _ref4$lowerSiblingCou ? [] : _ref4$lowerSiblingCou, nextNode = _extends({}, node), selfPath = isPseudoRoot ? [] : [].concat(_toConsumableArray(path), [ getNodeKey({
                node: nextNode,
                treeIndex: currentIndex
            }) ]), selfInfo = {
                node: nextNode,
                parentNode: parentNode,
                path: selfPath,
                lowerSiblingCounts: lowerSiblingCounts,
                treeIndex: currentIndex
            };
            // Return self on nodes with no children or hidden children
            if (!nextNode.children || nextNode.expanded !== !0 && ignoreCollapsed && !isPseudoRoot) return {
                treeIndex: currentIndex,
                node: callback(selfInfo)
            };
            // Get all descendants
            var childIndex = currentIndex, childCount = nextNode.children.length;
            return "function" != typeof nextNode.children && (nextNode.children = nextNode.children.map(function(child, i) {
                var mapResult = mapDescendants({
                    callback: callback,
                    getNodeKey: getNodeKey,
                    ignoreCollapsed: ignoreCollapsed,
                    node: child,
                    parentNode: isPseudoRoot ? null : nextNode,
                    currentIndex: childIndex + 1,
                    lowerSiblingCounts: [].concat(_toConsumableArray(lowerSiblingCounts), [ childCount - i - 1 ]),
                    path: selfPath
                });
                return childIndex = mapResult.treeIndex, mapResult.node;
            })), {
                node: callback(selfInfo),
                treeIndex: childIndex
            };
        }
        /**
	 * Count all the visible (expanded) descendants in the tree data.
	 *
	 * @param {!Object[]} treeData - Tree data
	 *
	 * @return {number} count
	 */
        function getVisibleNodeCount(_ref5) {
            var treeData = _ref5.treeData, traverse = function traverse(node) {
                return node.children && node.expanded === !0 && "function" != typeof node.children ? 1 + node.children.reduce(function(total, currentNode) {
                    return total + traverse(currentNode);
                }, 0) : 1;
            };
            return treeData.reduce(function(total, currentNode) {
                return total + traverse(currentNode);
            }, 0);
        }
        /**
	 * Get the <targetIndex>th visible node in the tree data.
	 *
	 * @param {!Object[]} treeData - Tree data
	 * @param {!number} targetIndex - The index of the node to search for
	 * @param {!function} getNodeKey - Function to get the key from the nodeData and tree index
	 *
	 * @return {{
	 *      node: Object,
	 *      path: []string|[]number,
	 *      lowerSiblingCounts: []number
	 *  }|null} node - The node at targetIndex, or null if not found
	 */
        function getVisibleNodeInfoAtIndex(_ref6) {
            var treeData = _ref6.treeData, targetIndex = _ref6.index, getNodeKey = _ref6.getNodeKey;
            if (!treeData || treeData.length < 1) return null;
            // Call the tree traversal with a pseudo-root node
            var result = getNodeDataAtTreeIndexOrNextIndex({
                targetIndex: targetIndex,
                getNodeKey: getNodeKey,
                node: {
                    children: treeData,
                    expanded: !0
                },
                currentIndex: -1,
                path: [],
                lowerSiblingCounts: [],
                isPseudoRoot: !0
            });
            return result.node ? result : null;
        }
        /**
	 * Walk descendants depth-first and call a callback on each
	 *
	 * @param {!Object[]} treeData - Tree data
	 * @param {!function} getNodeKey - Function to get the key from the nodeData and tree index
	 * @param {function} callback - Function to call on each node
	 * @param {boolean=} ignoreCollapsed - Ignore children of nodes without `expanded` set to `true`
	 *
	 * @return void
	 */
        function walk(_ref7) {
            var treeData = _ref7.treeData, getNodeKey = _ref7.getNodeKey, callback = _ref7.callback, _ref7$ignoreCollapsed = _ref7.ignoreCollapsed, ignoreCollapsed = void 0 === _ref7$ignoreCollapsed || _ref7$ignoreCollapsed;
            if (treeData && !(treeData.length < 1)) return walkDescendants({
                callback: callback,
                getNodeKey: getNodeKey,
                ignoreCollapsed: ignoreCollapsed,
                isPseudoRoot: !0,
                node: {
                    children: treeData
                },
                currentIndex: -1,
                path: [],
                lowerSiblingCounts: []
            });
        }
        /**
	 * Perform a depth-first transversal of the descendants and
	 *  make a change to every node in the tree
	 *
	 * @param {!Object[]} treeData - Tree data
	 * @param {!function} getNodeKey - Function to get the key from the nodeData and tree index
	 * @param {function} callback - Function to call on each node
	 * @param {boolean=} ignoreCollapsed - Ignore children of nodes without `expanded` set to `true`
	 *
	 * @return {Object[]} changedTreeData - The changed tree data
	 */
        function map(_ref8) {
            var treeData = _ref8.treeData, getNodeKey = _ref8.getNodeKey, callback = _ref8.callback, _ref8$ignoreCollapsed = _ref8.ignoreCollapsed, ignoreCollapsed = void 0 === _ref8$ignoreCollapsed || _ref8$ignoreCollapsed;
            return !treeData || treeData.length < 1 ? [] : mapDescendants({
                callback: callback,
                getNodeKey: getNodeKey,
                ignoreCollapsed: ignoreCollapsed,
                isPseudoRoot: !0,
                node: {
                    children: treeData
                },
                currentIndex: -1,
                path: [],
                lowerSiblingCounts: []
            }).node.children;
        }
        /**
	 * Expand or close every node in the tree
	 *
	 * @param {!Object[]} treeData - Tree data
	 * @param {?boolean} expanded - Whether the node is expanded or not
	 *
	 * @return {Object[]} changedTreeData - The changed tree data
	 */
        function toggleExpandedForAll(_ref9) {
            var treeData = _ref9.treeData, _ref9$expanded = _ref9.expanded, expanded = void 0 === _ref9$expanded || _ref9$expanded;
            return map({
                treeData: treeData,
                callback: function(_ref10) {
                    var node = _ref10.node;
                    return _extends({}, node, {
                        expanded: expanded
                    });
                },
                getNodeKey: function(_ref11) {
                    var treeIndex = _ref11.treeIndex;
                    return treeIndex;
                },
                ignoreCollapsed: !1
            });
        }
        /**
	 * Replaces node at path with object, or callback-defined object
	 *
	 * @param {!Object[]} treeData
	 * @param {number[]|string[]} path - Array of keys leading up to node to be changed
	 * @param {function|any} newNode - Node to replace the node at the path with, or a function producing the new node
	 * @param {!function} getNodeKey - Function to get the key from the nodeData and tree index
	 * @param {boolean=} ignoreCollapsed - Ignore children of nodes without `expanded` set to `true`
	 *
	 * @return {Object[]} changedTreeData - The changed tree data
	 */
        function changeNodeAtPath(_ref12) {
            var treeData = _ref12.treeData, path = _ref12.path, newNode = _ref12.newNode, getNodeKey = _ref12.getNodeKey, _ref12$ignoreCollapse = _ref12.ignoreCollapsed, ignoreCollapsed = void 0 === _ref12$ignoreCollapse || _ref12$ignoreCollapse, RESULT_MISS = "RESULT_MISS", traverse = function traverse(_ref13) {
                var _ref13$isPseudoRoot = _ref13.isPseudoRoot, isPseudoRoot = void 0 !== _ref13$isPseudoRoot && _ref13$isPseudoRoot, node = _ref13.node, currentTreeIndex = _ref13.currentTreeIndex, pathIndex = _ref13.pathIndex;
                if (!isPseudoRoot && getNodeKey({
                    node: node,
                    treeIndex: currentTreeIndex
                }) !== path[pathIndex]) return RESULT_MISS;
                if (pathIndex >= path.length - 1) // If this is the final location in the path, return its changed form
                return "function" == typeof newNode ? newNode({
                    node: node,
                    treeIndex: currentTreeIndex
                }) : newNode;
                if (!node.children) // If this node is part of the path, but has no children, return the unchanged node
                throw new Error("Path referenced children of node with no children.");
                for (var nextTreeIndex = currentTreeIndex + 1, i = 0; i < node.children.length; i++) {
                    var _result = traverse({
                        node: node.children[i],
                        currentTreeIndex: nextTreeIndex,
                        pathIndex: pathIndex + 1
                    });
                    // If the result went down the correct path
                    if (_result !== RESULT_MISS) return _result ? _extends({}, node, {
                        children: [].concat(_toConsumableArray(node.children.slice(0, i)), [ _result ], _toConsumableArray(node.children.slice(i + 1)))
                    }) : _extends({}, node, {
                        children: [].concat(_toConsumableArray(node.children.slice(0, i)), _toConsumableArray(node.children.slice(i + 1)))
                    });
                    nextTreeIndex += 1 + getDescendantCount({
                        node: node.children[i],
                        ignoreCollapsed: ignoreCollapsed
                    });
                }
                return RESULT_MISS;
            }, result = traverse({
                node: {
                    children: treeData
                },
                currentTreeIndex: -1,
                pathIndex: -1,
                isPseudoRoot: !0
            });
            if (result === RESULT_MISS) throw new Error("No node found at the given path.");
            return result.children;
        }
        /**
	 * Removes the node at the specified path and returns the resulting treeData.
	 *
	 * @param {!Object[]} treeData
	 * @param {number[]|string[]} path - Array of keys leading up to node to be deleted
	 * @param {!function} getNodeKey - Function to get the key from the nodeData and tree index
	 * @param {boolean=} ignoreCollapsed - Ignore children of nodes without `expanded` set to `true`
	 *
	 * @return {Object[]} changedTreeData - The tree data with the node removed
	 */
        function removeNodeAtPath(_ref14) {
            var treeData = _ref14.treeData, path = _ref14.path, getNodeKey = _ref14.getNodeKey, _ref14$ignoreCollapse = _ref14.ignoreCollapsed, ignoreCollapsed = void 0 === _ref14$ignoreCollapse || _ref14$ignoreCollapse;
            return changeNodeAtPath({
                treeData: treeData,
                path: path,
                getNodeKey: getNodeKey,
                ignoreCollapsed: ignoreCollapsed,
                newNode: null
            });
        }
        /**
	 * Gets the node at the specified path
	 *
	 * @param {!Object[]} treeData
	 * @param {number[]|string[]} path - Array of keys leading up to node to be deleted
	 * @param {!function} getNodeKey - Function to get the key from the nodeData and tree index
	 * @param {boolean=} ignoreCollapsed - Ignore children of nodes without `expanded` set to `true`
	 *
	 * @return {Object|null} nodeInfo - The node info at the given path, or null if not found
	 */
        function getNodeAtPath(_ref15) {
            var treeData = _ref15.treeData, path = _ref15.path, getNodeKey = _ref15.getNodeKey, _ref15$ignoreCollapse = _ref15.ignoreCollapsed, ignoreCollapsed = void 0 === _ref15$ignoreCollapse || _ref15$ignoreCollapse, foundNodeInfo = null;
            try {
                changeNodeAtPath({
                    treeData: treeData,
                    path: path,
                    getNodeKey: getNodeKey,
                    ignoreCollapsed: ignoreCollapsed,
                    newNode: function(_ref16) {
                        var node = _ref16.node, treeIndex = _ref16.treeIndex;
                        return foundNodeInfo = {
                            node: node,
                            treeIndex: treeIndex
                        }, node;
                    }
                });
            } catch (err) {}
            return foundNodeInfo;
        }
        /**
	 * Adds the node to the specified parent and returns the resulting treeData.
	 *
	 * @param {!Object[]} treeData
	 * @param {!Object} newNode - The node to insert
	 * @param {number|string} parentKey - The key of the to-be parentNode of the node
	 * @param {!function} getNodeKey - Function to get the key from the nodeData and tree index
	 * @param {boolean=} ignoreCollapsed - Ignore children of nodes without `expanded` set to `true`
	 * @param {boolean=} expandParent - If true, expands the parentNode specified by parentPath
	 *
	 * @return {Object} result
	 * @return {Object[]} result.treeData - The updated tree data
	 * @return {number} result.treeIndex - The tree index at which the node was inserted
	 */
        function addNodeUnderParent(_ref17) {
            var treeData = _ref17.treeData, newNode = _ref17.newNode, _ref17$parentKey = _ref17.parentKey, parentKey = void 0 === _ref17$parentKey ? null : _ref17$parentKey, getNodeKey = _ref17.getNodeKey, _ref17$ignoreCollapse = _ref17.ignoreCollapsed, ignoreCollapsed = void 0 === _ref17$ignoreCollapse || _ref17$ignoreCollapse, _ref17$expandParent = _ref17.expandParent, expandParent = void 0 !== _ref17$expandParent && _ref17$expandParent;
            if (null === parentKey) return {
                treeData: [].concat(_toConsumableArray(treeData || []), [ newNode ]),
                treeIndex: (treeData || []).length
            };
            var insertedTreeIndex = null, hasBeenAdded = !1, changedTreeData = map({
                treeData: treeData,
                getNodeKey: getNodeKey,
                ignoreCollapsed: ignoreCollapsed,
                callback: function(_ref18) {
                    var node = _ref18.node, treeIndex = _ref18.treeIndex, path = _ref18.path, key = path ? path[path.length - 1] : null;
                    // Return nodes that are not the parent as-is
                    if (hasBeenAdded || key !== parentKey) return node;
                    hasBeenAdded = !0;
                    var parentNode = _extends({}, node);
                    // If no children exist yet, just add the single newNode
                    if (expandParent && (parentNode.expanded = !0), !parentNode.children) return insertedTreeIndex = treeIndex + 1, 
                    _extends({}, parentNode, {
                        children: [ newNode ]
                    });
                    if ("function" == typeof parentNode.children) throw new Error("Cannot add to children defined by a function");
                    for (var nextTreeIndex = treeIndex + 1, i = 0; i < parentNode.children.length; i++) nextTreeIndex += 1 + getDescendantCount({
                        node: parentNode.children[i],
                        ignoreCollapsed: ignoreCollapsed
                    });
                    return insertedTreeIndex = nextTreeIndex, _extends({}, parentNode, {
                        children: [].concat(_toConsumableArray(parentNode.children), [ newNode ])
                    });
                }
            });
            if (!hasBeenAdded) throw new Error("No node found with the given key.");
            return {
                treeData: changedTreeData,
                treeIndex: insertedTreeIndex
            };
        }
        function addNodeAtDepthAndIndex(_ref19) {
            var targetDepth = _ref19.targetDepth, minimumTreeIndex = _ref19.minimumTreeIndex, newNode = _ref19.newNode, ignoreCollapsed = _ref19.ignoreCollapsed, expandParent = _ref19.expandParent, _ref19$isPseudoRoot = _ref19.isPseudoRoot, isPseudoRoot = void 0 !== _ref19$isPseudoRoot && _ref19$isPseudoRoot, isLastChild = _ref19.isLastChild, node = _ref19.node, currentIndex = _ref19.currentIndex, currentDepth = _ref19.currentDepth, getNodeKey = _ref19.getNodeKey, _ref19$path = _ref19.path, path = void 0 === _ref19$path ? [] : _ref19$path, selfPath = function(n) {
                return isPseudoRoot ? [] : [].concat(_toConsumableArray(path), [ getNodeKey({
                    node: n,
                    treeIndex: currentIndex
                }) ]);
            };
            // If the current position is the only possible place to add, add it
            if (currentIndex >= minimumTreeIndex - 1 || isLastChild && (!node.children || !node.children.length)) {
                if ("function" == typeof node.children) throw new Error("Cannot add to children defined by a function");
                var extraNodeProps = expandParent ? {
                    expanded: !0
                } : {}, _nextNode = _extends({}, node, extraNodeProps, {
                    children: node.children ? [ newNode ].concat(_toConsumableArray(node.children)) : [ newNode ]
                });
                return {
                    node: _nextNode,
                    nextIndex: currentIndex + 2,
                    insertedTreeIndex: currentIndex + 1,
                    parentPath: selfPath(_nextNode),
                    parentNode: isPseudoRoot ? null : _nextNode
                };
            }
            // If this is the target depth for the insertion,
            // i.e., where the newNode can be added to the current node's children
            if (currentDepth >= targetDepth - 1) {
                // Skip over nodes with no children or hidden children
                if (!node.children || "function" == typeof node.children || node.expanded !== !0 && ignoreCollapsed && !isPseudoRoot) return {
                    node: node,
                    nextIndex: currentIndex + 1
                };
                for (var _childIndex = currentIndex + 1, _insertedTreeIndex = null, insertIndex = null, i = 0; i < node.children.length; i++) {
                    // If a valid location is found, mark it as the insertion location and
                    // break out of the loop
                    if (_childIndex >= minimumTreeIndex) {
                        _insertedTreeIndex = _childIndex, insertIndex = i;
                        break;
                    }
                    // Increment the index by the child itself plus the number of descendants it has
                    _childIndex += 1 + getDescendantCount({
                        node: node.children[i],
                        ignoreCollapsed: ignoreCollapsed
                    });
                }
                // If no valid indices to add the node were found
                if (null === insertIndex) {
                    // If the last position in this node's children is less than the minimum index
                    // and there are more children on the level of this node, return without insertion
                    if (_childIndex < minimumTreeIndex && !isLastChild) return {
                        node: node,
                        nextIndex: _childIndex
                    };
                    // Use the last position in the children array to insert the newNode
                    _insertedTreeIndex = _childIndex, insertIndex = node.children.length;
                }
                // Insert the newNode at the insertIndex
                var _nextNode2 = _extends({}, node, {
                    children: [].concat(_toConsumableArray(node.children.slice(0, insertIndex)), [ newNode ], _toConsumableArray(node.children.slice(insertIndex)))
                });
                // Return node with successful insert result
                return {
                    node: _nextNode2,
                    nextIndex: _childIndex,
                    insertedTreeIndex: _insertedTreeIndex,
                    parentPath: selfPath(_nextNode2),
                    parentNode: isPseudoRoot ? null : _nextNode2
                };
            }
            // Skip over nodes with no children or hidden children
            if (!node.children || "function" == typeof node.children || node.expanded !== !0 && ignoreCollapsed && !isPseudoRoot) return {
                node: node,
                nextIndex: currentIndex + 1
            };
            // Get all descendants
            var insertedTreeIndex = null, pathFragment = null, parentNode = null, childIndex = currentIndex + 1, newChildren = node.children;
            "function" != typeof newChildren && (newChildren = newChildren.map(function(child, i) {
                if (null !== insertedTreeIndex) return child;
                var mapResult = addNodeAtDepthAndIndex({
                    targetDepth: targetDepth,
                    minimumTreeIndex: minimumTreeIndex,
                    newNode: newNode,
                    ignoreCollapsed: ignoreCollapsed,
                    expandParent: expandParent,
                    isLastChild: isLastChild && i === newChildren.length - 1,
                    node: child,
                    currentIndex: childIndex,
                    currentDepth: currentDepth + 1,
                    getNodeKey: getNodeKey,
                    path: []
                });
                return "insertedTreeIndex" in mapResult && (insertedTreeIndex = mapResult.insertedTreeIndex, 
                pathFragment = mapResult.parentPath, parentNode = mapResult.parentNode), childIndex = mapResult.nextIndex, 
                mapResult.node;
            }));
            var nextNode = _extends({}, node, {
                children: newChildren
            }), result = {
                node: nextNode,
                nextIndex: childIndex
            };
            return null !== insertedTreeIndex && (result.insertedTreeIndex = insertedTreeIndex, 
            result.parentPath = [].concat(_toConsumableArray(selfPath(nextNode)), _toConsumableArray(pathFragment)), 
            result.parentNode = parentNode), result;
        }
        /**
	 * Insert a node into the tree at the given depth, after the minimum index
	 *
	 * @param {!Object[]} treeData - Tree data
	 * @param {!number} depth - The depth to insert the node at (the first level of the array being depth 0)
	 * @param {!number} minimumTreeIndex - The lowest possible treeIndex to insert the node at
	 * @param {!Object} newNode - The node to insert into the tree
	 * @param {boolean=} ignoreCollapsed - Ignore children of nodes without `expanded` set to `true`
	 * @param {boolean=} expandParent - If true, expands the parent of the inserted node
	 * @param {!function} getNodeKey - Function to get the key from the nodeData and tree index
	 *
	 * @return {Object} result
	 * @return {Object[]} result.treeData - The tree data with the node added
	 * @return {number} result.treeIndex - The tree index at which the node was inserted
	 * @return {number[]|string[]} result.path - Array of keys leading to the node location after insertion
	 * @return {Object} result.parentNode - The parent node of the inserted node
	 */
        function insertNode(_ref20) {
            var treeData = _ref20.treeData, targetDepth = _ref20.depth, minimumTreeIndex = _ref20.minimumTreeIndex, newNode = _ref20.newNode, _ref20$getNodeKey = _ref20.getNodeKey, getNodeKey = void 0 === _ref20$getNodeKey ? function() {} : _ref20$getNodeKey, _ref20$ignoreCollapse = _ref20.ignoreCollapsed, ignoreCollapsed = void 0 === _ref20$ignoreCollapse || _ref20$ignoreCollapse, _ref20$expandParent = _ref20.expandParent, expandParent = void 0 !== _ref20$expandParent && _ref20$expandParent;
            if (!treeData && 0 === targetDepth) return {
                treeData: [ newNode ],
                treeIndex: 0,
                path: [ getNodeKey({
                    node: newNode,
                    treeIndex: 0
                }) ],
                parentNode: null
            };
            var insertResult = addNodeAtDepthAndIndex({
                targetDepth: targetDepth,
                minimumTreeIndex: minimumTreeIndex,
                newNode: newNode,
                ignoreCollapsed: ignoreCollapsed,
                expandParent: expandParent,
                getNodeKey: getNodeKey,
                isPseudoRoot: !0,
                isLastChild: !0,
                node: {
                    children: treeData
                },
                currentIndex: -1,
                currentDepth: -1
            });
            if (!("insertedTreeIndex" in insertResult)) throw new Error("No suitable position found to insert.");
            var treeIndex = insertResult.insertedTreeIndex;
            return {
                treeData: insertResult.node.children,
                treeIndex: treeIndex,
                path: [].concat(_toConsumableArray(insertResult.parentPath), [ getNodeKey({
                    node: newNode,
                    treeIndex: treeIndex
                }) ]),
                parentNode: insertResult.parentNode
            };
        }
        /**
	 * Get tree data flattened.
	 *
	 * @param {!Object[]} treeData - Tree data
	 * @param {!function} getNodeKey - Function to get the key from the nodeData and tree index
	 * @param {boolean=} ignoreCollapsed - Ignore children of nodes without `expanded` set to `true`
	 *
	 * @return {{
	 *      node: Object,
	 *      path: []string|[]number,
	 *      lowerSiblingCounts: []number
	 *  }}[] nodes - The node array
	 */
        function getFlatDataFromTree(_ref21) {
            var treeData = _ref21.treeData, getNodeKey = _ref21.getNodeKey, _ref21$ignoreCollapse = _ref21.ignoreCollapsed, ignoreCollapsed = void 0 === _ref21$ignoreCollapse || _ref21$ignoreCollapse;
            if (!treeData || treeData.length < 1) return [];
            var flattened = [];
            return walk({
                treeData: treeData,
                getNodeKey: getNodeKey,
                ignoreCollapsed: ignoreCollapsed,
                callback: function(nodeInfo) {
                    flattened.push(nodeInfo);
                }
            }), flattened;
        }
        /**
	 * Generate a tree structure from flat data.
	 *
	 * @param {!Object[]} flatData
	 * @param {!function=} getKey - Function to get the key from the nodeData
	 * @param {!function=} getParentKey - Function to get the parent key from the nodeData
	 * @param {string|number=} rootKey - The value returned by `getParentKey` that corresponds to the root node.
	 *                                  For example, if your nodes have id 1-99, you might use rootKey = 0
	 *
	 * @return {Object[]} treeData - The flat data represented as a tree
	 */
        function getTreeFromFlatData(_ref22) {
            var flatData = _ref22.flatData, _ref22$getKey = _ref22.getKey, getKey = void 0 === _ref22$getKey ? function(node) {
                return node.id;
            } : _ref22$getKey, _ref22$getParentKey = _ref22.getParentKey, getParentKey = void 0 === _ref22$getParentKey ? function(node) {
                return node.parentId;
            } : _ref22$getParentKey, _ref22$rootKey = _ref22.rootKey, rootKey = void 0 === _ref22$rootKey ? "0" : _ref22$rootKey;
            if (!flatData) return [];
            var childrenToParents = {};
            if (flatData.forEach(function(child) {
                var parentKey = getParentKey(child);
                parentKey in childrenToParents ? childrenToParents[parentKey].push(child) : childrenToParents[parentKey] = [ child ];
            }), !(rootKey in childrenToParents)) return [];
            var trav = function trav(parent) {
                var parentKey = getKey(parent);
                return parentKey in childrenToParents ? _extends({}, parent, {
                    children: childrenToParents[parentKey].map(function(child) {
                        return trav(child);
                    })
                }) : _extends({}, parent);
            };
            return childrenToParents[rootKey].map(function(child) {
                return trav(child);
            });
        }
        /**
	 * Check if a node is a descendant of another node.
	 *
	 * @param {!Object} older - Potential ancestor of younger node
	 * @param {!Object} younger - Potential descendant of older node
	 *
	 * @return {boolean}
	 */
        function isDescendant(older, younger) {
            return !!older.children && "function" != typeof older.children && older.children.some(function(child) {
                return child === younger || isDescendant(child, younger);
            });
        }
        /**
	 * Get the maximum depth of the children (the depth of the root node is 0).
	 *
	 * @param {!Object} node - Node in the tree
	 * @param {?number} depth - The current depth
	 *
	 * @return {number} maxDepth - The deepest depth in the tree
	 */
        function getDepth(node) {
            var depth = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
            return node.children ? "function" == typeof node.children ? depth + 1 : node.children.reduce(function(deepest, child) {
                return Math.max(deepest, getDepth(child, depth + 1));
            }, depth) : depth;
        }
        /**
	 * Find nodes matching a search query in the tree,
	 *
	 * @param {!function} getNodeKey - Function to get the key from the nodeData and tree index
	 * @param {!Object[]} treeData - Tree data
	 * @param {?string|number} searchQuery - Function returning a boolean to indicate whether the node is a match or not
	 * @param {!function} searchMethod - Function returning a boolean to indicate whether the node is a match or not
	 * @param {?number} searchFocusOffset - The offset of the match to focus on
	 *                                      (e.g., 0 focuses on the first match, 1 on the second)
	 * @param {boolean=} expandAllMatchPaths - If true, expands the paths to any matched node
	 * @param {boolean=} expandFocusMatchPaths - If true, expands the path to the focused node
	 *
	 * @return {Object[]} matches - An array of objects containing the matching `node`s, their `path`s and `treeIndex`s
	 * @return {Object[]} treeData - The original tree data with all relevant nodes expanded.
	 *                               If expandAllMatchPaths and expandFocusMatchPaths are both false,
	 *                               it will be the same as the original tree data.
	 */
        function find(_ref23) {
            var getNodeKey = _ref23.getNodeKey, treeData = _ref23.treeData, searchQuery = _ref23.searchQuery, searchMethod = _ref23.searchMethod, searchFocusOffset = _ref23.searchFocusOffset, _ref23$expandAllMatch = _ref23.expandAllMatchPaths, expandAllMatchPaths = void 0 !== _ref23$expandAllMatch && _ref23$expandAllMatch, _ref23$expandFocusMat = _ref23.expandFocusMatchPaths, expandFocusMatchPaths = void 0 === _ref23$expandFocusMat || _ref23$expandFocusMat, matchCount = 0, trav = function trav(_ref24) {
                var _ref24$isPseudoRoot = _ref24.isPseudoRoot, isPseudoRoot = void 0 !== _ref24$isPseudoRoot && _ref24$isPseudoRoot, node = _ref24.node, currentIndex = _ref24.currentIndex, _ref24$path = _ref24.path, path = void 0 === _ref24$path ? [] : _ref24$path, matches = [], isSelfMatch = !1, hasFocusMatch = !1, selfPath = isPseudoRoot ? [] : [].concat(_toConsumableArray(path), [ getNodeKey({
                    node: node,
                    treeIndex: currentIndex
                }) ]), extraInfo = isPseudoRoot ? null : {
                    path: selfPath,
                    treeIndex: currentIndex
                }, hasChildren = node.children && "function" != typeof node.children && node.children.length > 0;
                // Examine the current node to see if it is a match
                !isPseudoRoot && searchMethod(_extends({}, extraInfo, {
                    node: node,
                    searchQuery: searchQuery
                })) && (matchCount === searchFocusOffset && (hasFocusMatch = !0), // Keep track of the number of matching nodes, so we know when the searchFocusOffset
                //  is reached
                matchCount++, // We cannot add this node to the matches right away, as it may be changed
                //  during the search of the descendants. The entire node is used in
                //  comparisons between nodes inside the `matches` and `treeData` results
                //  of this method (`find`)
                isSelfMatch = !0);
                var childIndex = currentIndex, newNode = _extends({}, node);
                // Get all descendants
                // Cannot assign a treeIndex to hidden nodes
                // Add this node to the matches if it fits the search criteria.
                // This is performed at the last minute so newNode can be sent in its final form.
                return hasChildren && (newNode.children = newNode.children.map(function(child) {
                    var mapResult = trav({
                        node: child,
                        currentIndex: childIndex + 1,
                        path: selfPath
                    });
                    // Ignore hidden nodes by only advancing the index counter to the returned treeIndex
                    // if the child is expanded.
                    //
                    // The child could have been expanded from the start,
                    // or expanded due to a matching node being found in its descendants
                    // Expand the current node if it has descendants matching the search
                    // and the settings are set to do so.
                    return mapResult.node.expanded ? childIndex = mapResult.treeIndex : childIndex += 1, 
                    (mapResult.matches.length > 0 || mapResult.hasFocusMatch) && (matches = [].concat(_toConsumableArray(matches), _toConsumableArray(mapResult.matches)), 
                    mapResult.hasFocusMatch && (hasFocusMatch = !0), (expandAllMatchPaths && mapResult.matches.length > 0 || (expandAllMatchPaths || expandFocusMatchPaths) && mapResult.hasFocusMatch) && (newNode.expanded = !0)), 
                    mapResult.node;
                })), isPseudoRoot || newNode.expanded || (matches = matches.map(function(match) {
                    return _extends({}, match, {
                        treeIndex: null
                    });
                })), isSelfMatch && (matches = [ _extends({}, extraInfo, {
                    node: newNode
                }) ].concat(_toConsumableArray(matches))), {
                    node: matches.length > 0 ? newNode : node,
                    matches: matches,
                    hasFocusMatch: hasFocusMatch,
                    treeIndex: childIndex
                };
            }, result = trav({
                node: {
                    children: treeData
                },
                isPseudoRoot: !0,
                currentIndex: -1
            });
            return {
                matches: result.matches,
                treeData: result.node.children
            };
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _extends = Object.assign || function(target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
            }
            return target;
        };
        exports.getDescendantCount = getDescendantCount, exports.getVisibleNodeCount = getVisibleNodeCount, 
        exports.getVisibleNodeInfoAtIndex = getVisibleNodeInfoAtIndex, exports.walk = walk, 
        exports.map = map, exports.toggleExpandedForAll = toggleExpandedForAll, exports.changeNodeAtPath = changeNodeAtPath, 
        exports.removeNodeAtPath = removeNodeAtPath, exports.getNodeAtPath = getNodeAtPath, 
        exports.addNodeUnderParent = addNodeUnderParent, exports.insertNode = insertNode, 
        exports.getFlatDataFromTree = getFlatDataFromTree, exports.getTreeFromFlatData = getTreeFromFlatData, 
        exports.isDescendant = isDescendant, exports.getDepth = getDepth, exports.find = find;
    }, /* 2 */
    /***/
    function(module, exports, __webpack_require__) {
        /* WEBPACK VAR INJECTION */
        (function(Buffer) {
            function cssWithMappingToString(item, useSourceMap) {
                var content = item[1] || "", cssMapping = item[3];
                if (!cssMapping) return content;
                if (useSourceMap) {
                    var sourceMapping = toComment(cssMapping), sourceURLs = cssMapping.sources.map(function(source) {
                        return "/*# sourceURL=" + cssMapping.sourceRoot + source + " */";
                    });
                    return [ content ].concat(sourceURLs).concat([ sourceMapping ]).join("\n");
                }
                return [ content ].join("\n");
            }
            // Adapted from convert-source-map (MIT)
            function toComment(sourceMap) {
                var base64 = new Buffer(JSON.stringify(sourceMap)).toString("base64"), data = "sourceMappingURL=data:application/json;charset=utf-8;base64," + base64;
                return "/*# " + data + " */";
            }
            /*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
            // css base code, injected by the css-loader
            module.exports = function(useSourceMap) {
                var list = [];
                // return the list of modules as css string
                // import a list of modules into the list
                return list.toString = function() {
                    return this.map(function(item) {
                        var content = cssWithMappingToString(item, useSourceMap);
                        return item[2] ? "@media " + item[2] + "{" + content + "}" : content;
                    }).join("");
                }, list.i = function(modules, mediaQuery) {
                    "string" == typeof modules && (modules = [ [ null, modules, "" ] ]);
                    for (var alreadyImportedModules = {}, i = 0; i < this.length; i++) {
                        var id = this[i][0];
                        "number" == typeof id && (alreadyImportedModules[id] = !0);
                    }
                    for (i = 0; i < modules.length; i++) {
                        var item = modules[i];
                        // skip already imported module
                        // this implementation is not 100% perfect for weird media query combinations
                        //  when a module is imported multiple times with different media queries.
                        //  I hope this will never occur (Hey this way we have smaller bundles)
                        "number" == typeof item[0] && alreadyImportedModules[item[0]] || (mediaQuery && !item[2] ? item[2] = mediaQuery : mediaQuery && (item[2] = "(" + item[2] + ") and (" + mediaQuery + ")"), 
                        list.push(item));
                    }
                }, list;
            };
        }).call(exports, __webpack_require__(14).Buffer);
    }, /* 3 */
    /***/
    function(module, exports, __webpack_require__) {
        function addStylesToDom(styles, options) {
            for (var i = 0; i < styles.length; i++) {
                var item = styles[i], domStyle = stylesInDom[item.id];
                if (domStyle) {
                    domStyle.refs++;
                    for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j](item.parts[j]);
                    for (;j < item.parts.length; j++) domStyle.parts.push(addStyle(item.parts[j], options));
                } else {
                    for (var parts = [], j = 0; j < item.parts.length; j++) parts.push(addStyle(item.parts[j], options));
                    stylesInDom[item.id] = {
                        id: item.id,
                        refs: 1,
                        parts: parts
                    };
                }
            }
        }
        function listToStyles(list) {
            for (var styles = [], newStyles = {}, i = 0; i < list.length; i++) {
                var item = list[i], id = item[0], css = item[1], media = item[2], sourceMap = item[3], part = {
                    css: css,
                    media: media,
                    sourceMap: sourceMap
                };
                newStyles[id] ? newStyles[id].parts.push(part) : styles.push(newStyles[id] = {
                    id: id,
                    parts: [ part ]
                });
            }
            return styles;
        }
        function insertStyleElement(options, styleElement) {
            var styleTarget = getElement(options.insertInto);
            if (!styleTarget) throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
            var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
            if ("top" === options.insertAt) lastStyleElementInsertedAtTop ? lastStyleElementInsertedAtTop.nextSibling ? styleTarget.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling) : styleTarget.appendChild(styleElement) : styleTarget.insertBefore(styleElement, styleTarget.firstChild), 
            styleElementsInsertedAtTop.push(styleElement); else {
                if ("bottom" !== options.insertAt) throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
                styleTarget.appendChild(styleElement);
            }
        }
        function removeStyleElement(styleElement) {
            styleElement.parentNode.removeChild(styleElement);
            var idx = styleElementsInsertedAtTop.indexOf(styleElement);
            idx >= 0 && styleElementsInsertedAtTop.splice(idx, 1);
        }
        function createStyleElement(options) {
            var styleElement = document.createElement("style");
            return options.attrs.type = "text/css", attachTagAttrs(styleElement, options.attrs), 
            insertStyleElement(options, styleElement), styleElement;
        }
        function createLinkElement(options) {
            var linkElement = document.createElement("link");
            return options.attrs.type = "text/css", options.attrs.rel = "stylesheet", attachTagAttrs(linkElement, options.attrs), 
            insertStyleElement(options, linkElement), linkElement;
        }
        function attachTagAttrs(element, attrs) {
            Object.keys(attrs).forEach(function(key) {
                element.setAttribute(key, attrs[key]);
            });
        }
        function addStyle(obj, options) {
            var styleElement, update, remove;
            if (options.singleton) {
                var styleIndex = singletonCounter++;
                styleElement = singletonElement || (singletonElement = createStyleElement(options)), 
                update = applyToSingletonTag.bind(null, styleElement, styleIndex, !1), remove = applyToSingletonTag.bind(null, styleElement, styleIndex, !0);
            } else obj.sourceMap && "function" == typeof URL && "function" == typeof URL.createObjectURL && "function" == typeof URL.revokeObjectURL && "function" == typeof Blob && "function" == typeof btoa ? (styleElement = createLinkElement(options), 
            update = updateLink.bind(null, styleElement, options), remove = function() {
                removeStyleElement(styleElement), styleElement.href && URL.revokeObjectURL(styleElement.href);
            }) : (styleElement = createStyleElement(options), update = applyToTag.bind(null, styleElement), 
            remove = function() {
                removeStyleElement(styleElement);
            });
            return update(obj), function(newObj) {
                if (newObj) {
                    if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) return;
                    update(obj = newObj);
                } else remove();
            };
        }
        function applyToSingletonTag(styleElement, index, remove, obj) {
            var css = remove ? "" : obj.css;
            if (styleElement.styleSheet) styleElement.styleSheet.cssText = replaceText(index, css); else {
                var cssNode = document.createTextNode(css), childNodes = styleElement.childNodes;
                childNodes[index] && styleElement.removeChild(childNodes[index]), childNodes.length ? styleElement.insertBefore(cssNode, childNodes[index]) : styleElement.appendChild(cssNode);
            }
        }
        function applyToTag(styleElement, obj) {
            var css = obj.css, media = obj.media;
            if (media && styleElement.setAttribute("media", media), styleElement.styleSheet) styleElement.styleSheet.cssText = css; else {
                for (;styleElement.firstChild; ) styleElement.removeChild(styleElement.firstChild);
                styleElement.appendChild(document.createTextNode(css));
            }
        }
        function updateLink(linkElement, options, obj) {
            var css = obj.css, sourceMap = obj.sourceMap, autoFixUrls = void 0 === options.convertToAbsoluteUrls && sourceMap;
            (options.convertToAbsoluteUrls || autoFixUrls) && (css = fixUrls(css)), sourceMap && (// http://stackoverflow.com/a/26603875
            css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */");
            var blob = new Blob([ css ], {
                type: "text/css"
            }), oldSrc = linkElement.href;
            linkElement.href = URL.createObjectURL(blob), oldSrc && URL.revokeObjectURL(oldSrc);
        }
        /*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
        var stylesInDom = {}, memoize = function(fn) {
            var memo;
            return function() {
                return "undefined" == typeof memo && (memo = fn.apply(this, arguments)), memo;
            };
        }, isOldIE = memoize(function() {
            // Test for IE <= 9 as proposed by Browserhacks
            // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
            // Tests for existence of standard globals is to allow style-loader 
            // to operate correctly into non-standard environments
            // @see https://github.com/webpack-contrib/style-loader/issues/177
            return window && document && document.all && !window.atob;
        }), getElement = function(fn) {
            var memo = {};
            return function(selector) {
                return "undefined" == typeof memo[selector] && (memo[selector] = fn.call(this, selector)), 
                memo[selector];
            };
        }(function(styleTarget) {
            return document.querySelector(styleTarget);
        }), singletonElement = null, singletonCounter = 0, styleElementsInsertedAtTop = [], fixUrls = __webpack_require__(21);
        module.exports = function(list, options) {
            options = options || {}, options.attrs = "object" == typeof options.attrs ? options.attrs : {}, 
            // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
            // tags it will allow on a page
            "undefined" == typeof options.singleton && (options.singleton = isOldIE()), // By default, add <style> tags to the <head> element
            "undefined" == typeof options.insertInto && (options.insertInto = "head"), // By default, add <style> tags to the bottom of the target
            "undefined" == typeof options.insertAt && (options.insertAt = "bottom");
            var styles = listToStyles(list);
            return addStylesToDom(styles, options), function(newList) {
                for (var mayRemove = [], i = 0; i < styles.length; i++) {
                    var item = styles[i], domStyle = stylesInDom[item.id];
                    domStyle.refs--, mayRemove.push(domStyle);
                }
                if (newList) {
                    var newStyles = listToStyles(newList);
                    addStylesToDom(newStyles, options);
                }
                for (var i = 0; i < mayRemove.length; i++) {
                    var domStyle = mayRemove[i];
                    if (0 === domStyle.refs) {
                        for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();
                        delete stylesInDom[domStyle.id];
                    }
                }
            };
        };
        var replaceText = function() {
            var textStore = [];
            return function(index, replacement) {
                return textStore[index] = replacement, textStore.filter(Boolean).join("\n");
            };
        }();
    }, /* 4 */
    /***/
    function(module, exports) {
        module.exports = __WEBPACK_EXTERNAL_MODULE_4__;
    }, /* 5 */
    /***/
    function(module, exports) {
        "use strict";
        function defaultGetNodeKey(_ref) {
            var treeIndex = (_ref.node, _ref.treeIndex);
            return treeIndex;
        }
        // Cheap hack to get the text of a react object
        function getReactElementText(parent) {
            return "string" == typeof parent ? parent : "object" !== ("undefined" == typeof parent ? "undefined" : _typeof(parent)) || !parent.props || !parent.props.children || "string" != typeof parent.props.children && "object" !== _typeof(parent.props.children) ? "" : "string" == typeof parent.props.children ? parent.props.children : parent.props.children.map(function(child) {
                return getReactElementText(child);
            }).join("");
        }
        // Search for a query string inside a node property
        function stringSearch(key, searchQuery, node, path, treeIndex) {
            return "function" == typeof node[key] ? String(node[key]({
                node: node,
                path: path,
                treeIndex: treeIndex
            })).indexOf(searchQuery) > -1 : "object" === _typeof(node[key]) ? getReactElementText(node[key]).indexOf(searchQuery) > -1 : node[key] && String(node[key]).indexOf(searchQuery) > -1;
        }
        function defaultSearchMethod(_ref2) {
            var node = _ref2.node, path = _ref2.path, treeIndex = _ref2.treeIndex, searchQuery = _ref2.searchQuery;
            return stringSearch("title", searchQuery, node, path, treeIndex) || stringSearch("subtitle", searchQuery, node, path, treeIndex);
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
            return typeof obj;
        } : function(obj) {
            return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };
        exports.defaultGetNodeKey = defaultGetNodeKey, exports.defaultSearchMethod = defaultSearchMethod;
    }, /* 6 */
    /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        /**
	 * Insert a node into the tree at the given depth, after the minimum index
	 *
	 * @param {!Object[]} treeData - Tree data
	 * @param {!number} depth - The depth to insert the node at (the first level of the array being depth 0)
	 * @param {!number} minimumTreeIndex - The lowest possible treeIndex to insert the node at
	 * @param {!Object} newNode - The node to insert into the tree
	 * @param {boolean=} ignoreCollapsed - Ignore children of nodes without `expanded` set to `true`
	 * @param {boolean=} expandParent - If true, expands the parent of the inserted node
	 * @param {!function} getNodeKey - Function to get the key from the nodeData and tree index
	 *
	 * @return {Object} result
	 * @return {Object[]} result.treeData - The tree data with the node added
	 * @return {number} result.treeIndex - The tree index at which the node was inserted
	 * @return {number[]|string[]} result.path - Array of keys leading to the node location after insertion
	 */
        function memoizedInsertNode(args) {
            var keysArray = Object.keys(args).sort(), argsArray = keysArray.map(function(key) {
                return args[key];
            });
            // If the arguments for the last insert operation are different than this time,
            // recalculate the result
            return (argsArray.length !== memoizedInsertArgsArray.length || argsArray.some(function(arg, index) {
                return arg !== memoizedInsertArgsArray[index];
            }) || keysArray.some(function(key, index) {
                return key !== memoizedInsertKeysArray[index];
            })) && (memoizedInsertArgsArray = argsArray, memoizedInsertKeysArray = keysArray, 
            memoizedInsertResult = (0, _treeDataUtils.insertNode)(args)), memoizedInsertResult;
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.memoizedInsertNode = memoizedInsertNode;
        var _treeDataUtils = __webpack_require__(1), memoizedInsertArgsArray = [], memoizedInsertKeysArray = [], memoizedInsertResult = null;
    }, /* 7 */
    /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        function _objectWithoutProperties(obj, keys) {
            var target = {};
            for (var i in obj) keys.indexOf(i) >= 0 || Object.prototype.hasOwnProperty.call(obj, i) && (target[i] = obj[i]);
            return target;
        }
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
        }
        function _possibleConstructorReturn(self, call) {
            if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !call || "object" != typeof call && "function" != typeof call ? self : call;
        }
        function _inherits(subClass, superClass) {
            if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
            subClass.prototype = Object.create(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                    "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
                Constructor;
            };
        }(), _extends = Object.assign || function(target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
            }
            return target;
        }, _react = __webpack_require__(4), _react2 = _interopRequireDefault(_react), _browserUtils = __webpack_require__(10), _nodeRendererDefault = __webpack_require__(23), _nodeRendererDefault2 = _interopRequireDefault(_nodeRendererDefault), _treeDataUtils = __webpack_require__(1), styles = _nodeRendererDefault2.default;
        // Add extra classes in browsers that don't support flex
        _browserUtils.getIEVersion < 10 && (styles = _extends({}, _nodeRendererDefault2.default, {
            row: styles.row + " " + styles.row_NoFlex,
            rowContents: styles.rowContents + " " + styles.rowContents_NoFlex,
            rowLabel: styles.rowLabel + " " + styles.rowLabel_NoFlex,
            rowToolbar: styles.rowToolbar + " " + styles.rowToolbar_NoFlex
        }));
        var NodeRendererDefault = function(_Component) {
            function NodeRendererDefault() {
                return _classCallCheck(this, NodeRendererDefault), _possibleConstructorReturn(this, (NodeRendererDefault.__proto__ || Object.getPrototypeOf(NodeRendererDefault)).apply(this, arguments));
            }
            return _inherits(NodeRendererDefault, _Component), _createClass(NodeRendererDefault, [ {
                key: "render",
                value: function() {
                    var _props = this.props, scaffoldBlockPxWidth = _props.scaffoldBlockPxWidth, toggleChildrenVisibility = _props.toggleChildrenVisibility, connectDragPreview = _props.connectDragPreview, connectDragSource = _props.connectDragSource, isDragging = _props.isDragging, canDrop = _props.canDrop, canDrag = _props.canDrag, node = _props.node, draggedNode = _props.draggedNode, path = _props.path, treeIndex = _props.treeIndex, isSearchMatch = _props.isSearchMatch, isSearchFocus = _props.isSearchFocus, buttons = _props.buttons, className = _props.className, _props$style = _props.style, style = void 0 === _props$style ? {} : _props$style, didDrop = _props.didDrop, otherProps = (_props.isOver, 
                    _props.parentNode, _props.endDrag, _props.startDrag, _objectWithoutProperties(_props, [ "scaffoldBlockPxWidth", "toggleChildrenVisibility", "connectDragPreview", "connectDragSource", "isDragging", "canDrop", "canDrag", "node", "draggedNode", "path", "treeIndex", "isSearchMatch", "isSearchFocus", "buttons", "className", "style", "didDrop", "isOver", "parentNode", "endDrag", "startDrag" ])), handle = void 0;
                    canDrag && (// Show a loading symbol on the handle when the children are expanded
                    //  and yet still defined by a function (a callback to fetch the children)
                    handle = "function" == typeof node.children && node.expanded ? _react2.default.createElement("div", {
                        className: styles.loadingHandle
                    }, _react2.default.createElement("div", {
                        className: styles.loadingCircle
                    }, _react2.default.createElement("div", {
                        className: styles.loadingCirclePoint
                    }), _react2.default.createElement("div", {
                        className: styles.loadingCirclePoint
                    }), _react2.default.createElement("div", {
                        className: styles.loadingCirclePoint
                    }), _react2.default.createElement("div", {
                        className: styles.loadingCirclePoint
                    }), _react2.default.createElement("div", {
                        className: styles.loadingCirclePoint
                    }), _react2.default.createElement("div", {
                        className: styles.loadingCirclePoint
                    }), _react2.default.createElement("div", {
                        className: styles.loadingCirclePoint
                    }), _react2.default.createElement("div", {
                        className: styles.loadingCirclePoint
                    }), _react2.default.createElement("div", {
                        className: styles.loadingCirclePoint
                    }), _react2.default.createElement("div", {
                        className: styles.loadingCirclePoint
                    }), _react2.default.createElement("div", {
                        className: styles.loadingCirclePoint
                    }), _react2.default.createElement("div", {
                        className: styles.loadingCirclePoint
                    }))) : connectDragSource(_react2.default.createElement("div", {
                        className: styles.moveHandle
                    }), {
                        dropEffect: "copy"
                    }));
                    var isDraggedDescendant = draggedNode && (0, _treeDataUtils.isDescendant)(draggedNode, node), isLandingPadActive = !didDrop && isDragging;
                    return _react2.default.createElement("div", _extends({
                        style: {
                            height: "100%"
                        }
                    }, otherProps), toggleChildrenVisibility && node.children && node.children.length > 0 && _react2.default.createElement("div", null, _react2.default.createElement("button", {
                        type: "button",
                        "aria-label": node.expanded ? "Collapse" : "Expand",
                        className: node.expanded ? styles.collapseButton : styles.expandButton,
                        style: {
                            left: -.5 * scaffoldBlockPxWidth
                        },
                        onClick: function() {
                            return toggleChildrenVisibility({
                                node: node,
                                path: path,
                                treeIndex: treeIndex
                            });
                        }
                    }), node.expanded && !isDragging && _react2.default.createElement("div", {
                        style: {
                            width: scaffoldBlockPxWidth
                        },
                        className: styles.lineChildren
                    })), _react2.default.createElement("div", {
                        className: styles.rowWrapper
                    }, connectDragPreview(_react2.default.createElement("div", {
                        className: styles.row + (isLandingPadActive ? " " + styles.rowLandingPad : "") + (isLandingPadActive && !canDrop ? " " + styles.rowCancelPad : "") + (isSearchMatch ? " " + styles.rowSearchMatch : "") + (isSearchFocus ? " " + styles.rowSearchFocus : "") + (className ? " " + className : ""),
                        style: _extends({
                            opacity: isDraggedDescendant ? .5 : 1
                        }, style)
                    }, handle, _react2.default.createElement("div", {
                        className: styles.rowContents + (canDrag ? "" : " " + styles.rowContentsDragDisabled)
                    }, _react2.default.createElement("div", {
                        className: styles.rowLabel
                    }, _react2.default.createElement("span", {
                        className: styles.rowTitle + (node.subtitle ? " " + styles.rowTitleWithSubtitle : "")
                    }, "function" == typeof node.title ? node.title({
                        node: node,
                        path: path,
                        treeIndex: treeIndex
                    }) : node.title), node.subtitle && _react2.default.createElement("span", {
                        className: styles.rowSubtitle
                    }, "function" == typeof node.subtitle ? node.subtitle({
                        node: node,
                        path: path,
                        treeIndex: treeIndex
                    }) : node.subtitle)), _react2.default.createElement("div", {
                        className: styles.rowToolbar
                    }, buttons && buttons.map(function(btn, index) {
                        return _react2.default.createElement("div", {
                            key: index,
                            className: styles.toolbarButton
                        }, btn);
                    })))))));
                }
            } ]), NodeRendererDefault;
        }(_react.Component);
        NodeRendererDefault.propTypes = {
            node: _react.PropTypes.object.isRequired,
            path: _react.PropTypes.arrayOf(_react.PropTypes.oneOfType([ _react.PropTypes.string, _react.PropTypes.number ])).isRequired,
            treeIndex: _react.PropTypes.number.isRequired,
            isSearchMatch: _react.PropTypes.bool,
            isSearchFocus: _react.PropTypes.bool,
            canDrag: _react.PropTypes.bool,
            scaffoldBlockPxWidth: _react.PropTypes.number.isRequired,
            toggleChildrenVisibility: _react.PropTypes.func,
            buttons: _react.PropTypes.arrayOf(_react.PropTypes.node),
            className: _react.PropTypes.string,
            style: _react.PropTypes.object,
            // Drag and drop API functions
            // Drag source
            connectDragPreview: _react.PropTypes.func.isRequired,
            connectDragSource: _react.PropTypes.func.isRequired,
            parentNode: _react.PropTypes.object,
            // Needed for drag-and-drop utils
            startDrag: _react.PropTypes.func.isRequired,
            // Needed for drag-and-drop utils
            endDrag: _react.PropTypes.func.isRequired,
            // Needed for drag-and-drop utils
            isDragging: _react.PropTypes.bool.isRequired,
            didDrop: _react.PropTypes.bool.isRequired,
            draggedNode: _react.PropTypes.object,
            // Drop target
            isOver: _react.PropTypes.bool.isRequired,
            canDrop: _react.PropTypes.bool
        }, exports.default = NodeRendererDefault;
    }, /* 8 */
    /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
        }
        function _possibleConstructorReturn(self, call) {
            if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !call || "object" != typeof call && "function" != typeof call ? self : call;
        }
        function _inherits(subClass, superClass) {
            if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
            subClass.prototype = Object.create(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.SortableTreeWithoutDndContext = void 0;
        var _extends = Object.assign || function(target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
            }
            return target;
        }, _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                    "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
                Constructor;
            };
        }(), _react = __webpack_require__(4), _react2 = _interopRequireDefault(_react), _reactVirtualized = __webpack_require__(30), _lodash = __webpack_require__(26), _lodash2 = _interopRequireDefault(_lodash), _reactDndScrollzone = __webpack_require__(29), _reactDndScrollzone2 = _interopRequireDefault(_reactDndScrollzone);
        __webpack_require__(22);
        var _treeNode = __webpack_require__(9), _treeNode2 = _interopRequireDefault(_treeNode), _nodeRendererDefault = __webpack_require__(7), _nodeRendererDefault2 = _interopRequireDefault(_nodeRendererDefault), _treeDataUtils = __webpack_require__(1), _memoizedTreeDataUtils = __webpack_require__(6), _genericUtils = __webpack_require__(12), _defaultHandlers = __webpack_require__(5), _dragAndDropUtils = __webpack_require__(11), _reactSortableTree = __webpack_require__(24), _reactSortableTree2 = _interopRequireDefault(_reactSortableTree), dndTypeCounter = 1, ReactSortableTree = function(_Component) {
            function ReactSortableTree(props) {
                _classCallCheck(this, ReactSortableTree);
                var _this = _possibleConstructorReturn(this, (ReactSortableTree.__proto__ || Object.getPrototypeOf(ReactSortableTree)).call(this, props)), dndType = props.dndType, nodeContentRenderer = props.nodeContentRenderer, isVirtualized = props.isVirtualized, slideRegionSize = props.slideRegionSize, treeData = props.treeData;
                // Wrapping classes for use with react-dnd
                // Prepare scroll-on-drag options for this list
                return _this.dndType = dndType || "rst__" + dndTypeCounter++, _this.nodeContentRenderer = (0, 
                _dragAndDropUtils.dndWrapSource)(nodeContentRenderer, _this.dndType), _this.treeNodeRenderer = (0, 
                _dragAndDropUtils.dndWrapTarget)(_treeNode2.default, _this.dndType), isVirtualized && (_this.scrollZoneVirtualList = (0, 
                _reactDndScrollzone2.default)(_reactVirtualized.List), _this.vStrength = (0, _reactDndScrollzone.createVerticalStrength)(slideRegionSize), 
                _this.hStrength = (0, _reactDndScrollzone.createHorizontalStrength)(slideRegionSize)), 
                _this.state = {
                    draggingTreeData: null,
                    swapFrom: null,
                    swapLength: null,
                    swapDepth: null,
                    rows: _this.getRows(treeData),
                    searchMatches: [],
                    searchFocusTreeIndex: null
                }, _this.toggleChildrenVisibility = _this.toggleChildrenVisibility.bind(_this), 
                _this.moveNode = _this.moveNode.bind(_this), _this.startDrag = _this.startDrag.bind(_this), 
                _this.dragHover = _this.dragHover.bind(_this), _this.endDrag = _this.endDrag.bind(_this), 
                _this;
            }
            return _inherits(ReactSortableTree, _Component), _createClass(ReactSortableTree, [ {
                key: "componentWillMount",
                value: function() {
                    this.loadLazyChildren(), this.search(this.props, !1, !1), this.ignoreOneTreeUpdate = !1;
                }
            }, {
                key: "toggleChildrenVisibility",
                value: function(_ref) {
                    var targetNode = _ref.node, path = _ref.path, treeData = (_ref.treeIndex, (0, _treeDataUtils.changeNodeAtPath)({
                        treeData: this.props.treeData,
                        path: path,
                        newNode: function(_ref2) {
                            var node = _ref2.node;
                            return _extends({}, node, {
                                expanded: !node.expanded
                            });
                        },
                        getNodeKey: this.props.getNodeKey
                    }));
                    this.props.onChange(treeData), this.props.onVisibilityToggle && this.props.onVisibilityToggle({
                        treeData: treeData,
                        node: targetNode,
                        expanded: !targetNode.expanded
                    });
                }
            }, {
                key: "moveNode",
                value: function(_ref3) {
                    var node = _ref3.node, depth = _ref3.depth, minimumTreeIndex = _ref3.minimumTreeIndex, _insertNode = (0, 
                    _treeDataUtils.insertNode)({
                        treeData: this.state.draggingTreeData,
                        newNode: node,
                        depth: depth,
                        minimumTreeIndex: minimumTreeIndex,
                        expandParent: !0,
                        getNodeKey: this.props.getNodeKey
                    }), treeData = _insertNode.treeData, treeIndex = _insertNode.treeIndex, path = _insertNode.path;
                    this.props.onChange(treeData), this.props.onMoveNode && this.props.onMoveNode({
                        treeData: treeData,
                        node: node,
                        treeIndex: treeIndex,
                        path: path
                    });
                }
            }, {
                key: "componentWillReceiveProps",
                value: function(nextProps) {
                    this.setState({
                        searchFocusTreeIndex: null
                    }), this.props.treeData !== nextProps.treeData ? (// Ignore updates caused by search, in order to avoid infinite looping
                    this.ignoreOneTreeUpdate ? this.ignoreOneTreeUpdate = !1 : (this.loadLazyChildren(nextProps), 
                    // Load any children defined by a function
                    this.search(nextProps, !1, !1)), // Calculate the rows to be shown from the new tree data
                    this.setState({
                        draggingTreeData: null,
                        swapFrom: null,
                        swapLength: null,
                        swapDepth: null,
                        rows: this.getRows(nextProps.treeData)
                    })) : (0, _lodash2.default)(this.props.searchQuery, nextProps.searchQuery) ? this.props.searchFocusOffset !== nextProps.searchFocusOffset && this.search(nextProps, !0, !0, !0) : this.search(nextProps);
                }
            }, {
                key: "getRows",
                value: function(treeData) {
                    return (0, _treeDataUtils.getFlatDataFromTree)({
                        ignoreCollapsed: !0,
                        getNodeKey: this.props.getNodeKey,
                        treeData: treeData
                    });
                }
            }, {
                key: "search",
                value: function() {
                    var props = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.props, seekIndex = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1], expand = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2], singleSearch = arguments.length > 3 && void 0 !== arguments[3] && arguments[3], treeData = props.treeData, onChange = props.onChange, searchFinishCallback = props.searchFinishCallback, searchQuery = props.searchQuery, searchMethod = props.searchMethod, searchFocusOffset = props.searchFocusOffset;
                    // Skip search if no conditions are specified
                    if ((null === searchQuery || "undefined" == typeof searchQuery || "" === String(searchQuery)) && !searchMethod) return this.setState({
                        searchMatches: []
                    }), void (searchFinishCallback && searchFinishCallback([]));
                    var _find = (0, _treeDataUtils.find)({
                        getNodeKey: this.props.getNodeKey,
                        treeData: treeData,
                        searchQuery: searchQuery,
                        searchMethod: searchMethod || _defaultHandlers.defaultSearchMethod,
                        searchFocusOffset: searchFocusOffset,
                        expandAllMatchPaths: expand && !singleSearch,
                        expandFocusMatchPaths: expand && !0
                    }), expandedTreeData = _find.treeData, searchMatches = _find.matches;
                    // Update the tree with data leaving all paths leading to matching nodes open
                    expand && (this.ignoreOneTreeUpdate = !0, // Prevents infinite loop
                    onChange(expandedTreeData)), searchFinishCallback && searchFinishCallback(searchMatches);
                    var searchFocusTreeIndex = null;
                    seekIndex && null !== searchFocusOffset && searchFocusOffset < searchMatches.length && (searchFocusTreeIndex = searchMatches[searchFocusOffset].treeIndex), 
                    this.setState({
                        searchMatches: searchMatches,
                        searchFocusTreeIndex: searchFocusTreeIndex
                    });
                }
            }, {
                key: "startDrag",
                value: function(_ref4) {
                    var path = _ref4.path, draggingTreeData = (0, _treeDataUtils.removeNodeAtPath)({
                        treeData: this.props.treeData,
                        path: path,
                        getNodeKey: this.props.getNodeKey
                    });
                    this.setState({
                        draggingTreeData: draggingTreeData
                    });
                }
            }, {
                key: "dragHover",
                value: function(_ref5) {
                    var draggedNode = _ref5.node, depth = _ref5.depth, minimumTreeIndex = _ref5.minimumTreeIndex, addedResult = (0, 
                    _memoizedTreeDataUtils.memoizedInsertNode)({
                        treeData: this.state.draggingTreeData,
                        newNode: draggedNode,
                        depth: depth,
                        minimumTreeIndex: minimumTreeIndex,
                        expandParent: !0,
                        getNodeKey: this.props.getNodeKey
                    }), rows = this.getRows(addedResult.treeData), expandedParentPath = rows[addedResult.treeIndex].path, swapFrom = addedResult.treeIndex, swapTo = minimumTreeIndex, swapLength = 1 + (0, 
                    _treeDataUtils.getDescendantCount)({
                        node: draggedNode
                    });
                    this.setState({
                        rows: (0, _genericUtils.swapRows)(rows, swapFrom, swapTo, swapLength),
                        swapFrom: swapFrom,
                        swapLength: swapLength,
                        swapDepth: depth,
                        draggingTreeData: (0, _treeDataUtils.changeNodeAtPath)({
                            treeData: this.state.draggingTreeData,
                            path: expandedParentPath.slice(0, -1),
                            newNode: function(_ref6) {
                                var node = _ref6.node;
                                return _extends({}, node, {
                                    expanded: !0
                                });
                            },
                            getNodeKey: this.props.getNodeKey
                        })
                    });
                }
            }, {
                key: "endDrag",
                value: function(dropResult) {
                    return dropResult && dropResult.node ? void this.moveNode(dropResult) : this.setState({
                        draggingTreeData: null,
                        swapFrom: null,
                        swapLength: null,
                        swapDepth: null,
                        rows: this.getRows(this.props.treeData)
                    });
                }
            }, {
                key: "loadLazyChildren",
                value: function() {
                    var _this2 = this, props = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.props;
                    (0, _treeDataUtils.walk)({
                        treeData: props.treeData,
                        getNodeKey: this.props.getNodeKey,
                        callback: function(_ref7) {
                            var node = _ref7.node, path = _ref7.path, lowerSiblingCounts = _ref7.lowerSiblingCounts, treeIndex = _ref7.treeIndex;
                            // If the node has children defined by a function, and is either expanded
                            //  or set to load even before expansion, run the function.
                            node.children && "function" == typeof node.children && (node.expanded || props.loadCollapsedLazyChildren) && // Call the children fetching function
                            node.children({
                                node: node,
                                path: path,
                                lowerSiblingCounts: lowerSiblingCounts,
                                treeIndex: treeIndex,
                                // Provide a helper to append the new data when it is received
                                done: function(childrenArray) {
                                    return _this2.props.onChange((0, _treeDataUtils.changeNodeAtPath)({
                                        treeData: _this2.props.treeData,
                                        path: path,
                                        newNode: function(_ref8) {
                                            var oldNode = _ref8.node;
                                            // Only replace the old node if it's the one we set off to find children
                                            //  for in the first place
                                            return oldNode === node ? _extends({}, oldNode, {
                                                children: childrenArray
                                            }) : oldNode;
                                        },
                                        getNodeKey: _this2.props.getNodeKey
                                    }));
                                }
                            });
                        }
                    });
                }
            }, {
                key: "render",
                value: function() {
                    var _this3 = this, _props = this.props, style = _props.style, className = _props.className, innerStyle = _props.innerStyle, rowHeight = _props.rowHeight, getNodeKey = _props.getNodeKey, isVirtualized = _props.isVirtualized, _state = this.state, rows = _state.rows, searchMatches = _state.searchMatches, searchFocusTreeIndex = _state.searchFocusTreeIndex, matchKeys = {};
                    searchMatches.forEach(function(_ref9, i) {
                        var path = _ref9.path;
                        matchKeys[path[path.length - 1]] = i;
                    });
                    // Seek to the focused search result if there is one specified
                    var scrollToInfo = null !== searchFocusTreeIndex ? {
                        scrollToIndex: searchFocusTreeIndex
                    } : {}, containerStyle = style, list = void 0;
                    if (isVirtualized) {
                        containerStyle = _extends({
                            height: "100%"
                        }, containerStyle);
                        var ScrollZoneVirtualList = this.scrollZoneVirtualList;
                        // Render list with react-virtualized
                        list = _react2.default.createElement(_reactVirtualized.AutoSizer, null, function(_ref10) {
                            var height = _ref10.height, width = _ref10.width;
                            return _react2.default.createElement(ScrollZoneVirtualList, _extends({}, scrollToInfo, {
                                verticalStrength: _this3.vStrength,
                                horizontalStrength: _this3.hStrength,
                                speed: 30,
                                scrollToAlignment: "start",
                                className: _reactSortableTree2.default.virtualScrollOverride,
                                width: width,
                                onScroll: function(_ref11) {
                                    var scrollTop = _ref11.scrollTop;
                                    _this3.scrollTop = scrollTop;
                                },
                                height: height,
                                style: innerStyle,
                                rowCount: rows.length,
                                estimatedRowSize: "function" != typeof rowHeight ? rowHeight : void 0,
                                rowHeight: rowHeight,
                                rowRenderer: function(_ref12) {
                                    var index = _ref12.index, key = _ref12.key, rowStyle = _ref12.style;
                                    return _this3.renderRow(rows[index], index, key, rowStyle, function() {
                                        return rows[index - 1] || null;
                                    }, matchKeys);
                                }
                            }, _this3.props.reactVirtualizedListProps));
                        });
                    } else // Render list without react-virtualized
                    list = rows.map(function(row, index) {
                        return _this3.renderRow(row, index, getNodeKey({
                            node: row.node,
                            treeIndex: row.treeIndex
                        }), {
                            height: "function" != typeof rowHeight ? rowHeight : rowHeight({
                                index: index
                            })
                        }, function() {
                            return rows[index - 1] || null;
                        }, matchKeys);
                    });
                    return _react2.default.createElement("div", {
                        className: _reactSortableTree2.default.tree + (className ? " " + className : ""),
                        style: containerStyle
                    }, list);
                }
            }, {
                key: "renderRow",
                value: function(_ref13, listIndex, key, style, getPrevRow, matchKeys) {
                    var node = _ref13.node, parentNode = _ref13.parentNode, path = _ref13.path, lowerSiblingCounts = _ref13.lowerSiblingCounts, treeIndex = _ref13.treeIndex, _props2 = this.props, canDrag = _props2.canDrag, canDrop = _props2.canDrop, generateNodeProps = _props2.generateNodeProps, getNodeKey = _props2.getNodeKey, maxDepth = _props2.maxDepth, scaffoldBlockPxWidth = _props2.scaffoldBlockPxWidth, searchFocusOffset = _props2.searchFocusOffset, TreeNodeRenderer = this.treeNodeRenderer, NodeContentRenderer = this.nodeContentRenderer, nodeKey = path[path.length - 1], isSearchMatch = nodeKey in matchKeys, isSearchFocus = isSearchMatch && matchKeys[nodeKey] === searchFocusOffset, callbackParams = {
                        node: node,
                        parentNode: parentNode,
                        path: path,
                        lowerSiblingCounts: lowerSiblingCounts,
                        treeIndex: treeIndex,
                        isSearchMatch: isSearchMatch,
                        isSearchFocus: isSearchFocus
                    }, nodeProps = generateNodeProps ? generateNodeProps(callbackParams) : {}, rowCanDrag = "function" != typeof canDrag ? canDrag : canDrag(callbackParams);
                    return _react2.default.createElement(TreeNodeRenderer, {
                        style: style,
                        key: key,
                        treeIndex: treeIndex,
                        listIndex: listIndex,
                        getPrevRow: getPrevRow,
                        treeData: this.state.draggingTreeData || this.state.treeData,
                        getNodeKey: getNodeKey,
                        customCanDrop: canDrop,
                        node: node,
                        path: path,
                        lowerSiblingCounts: lowerSiblingCounts,
                        scaffoldBlockPxWidth: scaffoldBlockPxWidth,
                        swapFrom: this.state.swapFrom,
                        swapLength: this.state.swapLength,
                        swapDepth: this.state.swapDepth,
                        maxDepth: maxDepth,
                        dragHover: this.dragHover
                    }, _react2.default.createElement(NodeContentRenderer, _extends({
                        node: node,
                        parentNode: parentNode,
                        path: path,
                        isSearchMatch: isSearchMatch,
                        isSearchFocus: isSearchFocus,
                        treeIndex: treeIndex,
                        startDrag: this.startDrag,
                        endDrag: this.endDrag,
                        canDrag: rowCanDrag,
                        toggleChildrenVisibility: this.toggleChildrenVisibility,
                        scaffoldBlockPxWidth: scaffoldBlockPxWidth
                    }, nodeProps)));
                }
            } ]), ReactSortableTree;
        }(_react.Component);
        ReactSortableTree.propTypes = {
            // Tree data in the following format:
            // [{title: 'main', subtitle: 'sub'}, { title: 'value2', expanded: true, children: [{ title: 'value3') }] }]
            // `title` is the primary label for the node
            // `subtitle` is a secondary label for the node
            // `expanded` shows children of the node if true, or hides them if false. Defaults to false.
            // `children` is an array of child nodes belonging to the node.
            treeData: _react.PropTypes.arrayOf(_react.PropTypes.object).isRequired,
            // Style applied to the container wrapping the tree (style defaults to {height: '100%'})
            style: _react.PropTypes.object,
            // Class name for the container wrapping the tree
            className: _react.PropTypes.string,
            // Style applied to the inner, scrollable container (for padding, etc.)
            innerStyle: _react.PropTypes.object,
            // Used by react-virtualized
            // Either a fixed row height (number) or a function that returns the
            // height of a row given its index: `({ index: number }): number`
            rowHeight: _react.PropTypes.oneOfType([ _react.PropTypes.number, _react.PropTypes.func ]),
            // Size in px of the region near the edges that initiates scrolling on dragover
            slideRegionSize: _react.PropTypes.number.isRequired,
            // eslint-disable-line react/no-unused-prop-types
            // Custom properties to hand to the react-virtualized list
            // https://github.com/bvaughn/react-virtualized/blob/master/docs/List.md#prop-types
            reactVirtualizedListProps: _react.PropTypes.object,
            // The width of the blocks containing the lines representing the structure of the tree.
            scaffoldBlockPxWidth: _react.PropTypes.number,
            // Maximum depth nodes can be inserted at. Defaults to infinite.
            maxDepth: _react.PropTypes.number,
            // The method used to search nodes.
            // Defaults to a function that uses the `searchQuery` string to search for nodes with
            // matching `title` or `subtitle` values.
            // NOTE: Changing `searchMethod` will not update the search, but changing the `searchQuery` will.
            searchMethod: _react.PropTypes.func,
            // eslint-disable-line react/no-unused-prop-types
            // Used by the `searchMethod` to highlight and scroll to matched nodes.
            // Should be a string for the default `searchMethod`, but can be anything when using a custom search.
            searchQuery: _react.PropTypes.any,
            // Outline the <`searchFocusOffset`>th node and scroll to it.
            searchFocusOffset: _react.PropTypes.number,
            // Get the nodes that match the search criteria. Used for counting total matches, etc.
            searchFinishCallback: _react.PropTypes.func,
            // eslint-disable-line react/no-unused-prop-types
            // Generate an object with additional props to be passed to the node renderer.
            // Use this for adding buttons via the `buttons` key,
            // or additional `style` / `className` settings.
            generateNodeProps: _react.PropTypes.func,
            // Set to false to disable virtualization.
            // NOTE: Auto-scrolling while dragging, and scrolling to the `searchFocusOffset` will be disabled.
            isVirtualized: _react.PropTypes.bool,
            // Override the default component for rendering nodes (but keep the scaffolding generator)
            // This is an advanced option for complete customization of the appearance.
            // It is best to copy the component in `node-renderer-default.js` to use as a base, and customize as needed.
            nodeContentRenderer: _react.PropTypes.any,
            // Determine the unique key used to identify each node and
            // generate the `path` array passed in callbacks.
            // By default, returns the index in the tree (omitting hidden nodes).
            getNodeKey: _react.PropTypes.func,
            // Called whenever tree data changed.
            // Just like with React input elements, you have to update your
            // own component's data to see the changes reflected.
            onChange: _react.PropTypes.func.isRequired,
            // Called after node move operation.
            onMoveNode: _react.PropTypes.func,
            // Determine whether a node can be dragged. Set to false to disable dragging on all nodes.
            canDrag: _react.PropTypes.oneOfType([ _react.PropTypes.func, _react.PropTypes.bool ]),
            // Determine whether a node can be dropped based on its path and parents'.
            canDrop: _react.PropTypes.func,
            // Called after children nodes collapsed or expanded.
            onVisibilityToggle: _react.PropTypes.func,
            dndType: _react.PropTypes.string
        }, ReactSortableTree.defaultProps = {
            getNodeKey: _defaultHandlers.defaultGetNodeKey,
            nodeContentRenderer: _nodeRendererDefault2.default,
            rowHeight: 62,
            slideRegionSize: 100,
            scaffoldBlockPxWidth: 44,
            style: {},
            innerStyle: {},
            searchQuery: null,
            isVirtualized: !0,
            canDrag: !0
        }, // Export the tree component without the react-dnd DragDropContext,
        // for when component is used with other components using react-dnd.
        // see: https://github.com/gaearon/react-dnd/issues/186
        exports.SortableTreeWithoutDndContext = ReactSortableTree, exports.default = (0, 
        _dragAndDropUtils.dndWrapRoot)(ReactSortableTree);
    }, /* 9 */
    /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        function _objectWithoutProperties(obj, keys) {
            var target = {};
            for (var i in obj) keys.indexOf(i) >= 0 || Object.prototype.hasOwnProperty.call(obj, i) && (target[i] = obj[i]);
            return target;
        }
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
        }
        function _possibleConstructorReturn(self, call) {
            if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !call || "object" != typeof call && "function" != typeof call ? self : call;
        }
        function _inherits(subClass, superClass) {
            if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
            subClass.prototype = Object.create(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _extends = Object.assign || function(target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
            }
            return target;
        }, _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                    "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
                Constructor;
            };
        }(), _react = __webpack_require__(4), _react2 = _interopRequireDefault(_react), _treeNode = __webpack_require__(25), _treeNode2 = _interopRequireDefault(_treeNode), TreeNode = function(_Component) {
            function TreeNode() {
                return _classCallCheck(this, TreeNode), _possibleConstructorReturn(this, (TreeNode.__proto__ || Object.getPrototypeOf(TreeNode)).apply(this, arguments));
            }
            return _inherits(TreeNode, _Component), _createClass(TreeNode, [ {
                key: "render",
                value: function() {
                    var _props = this.props, children = _props.children, listIndex = _props.listIndex, swapFrom = _props.swapFrom, swapLength = _props.swapLength, swapDepth = _props.swapDepth, scaffoldBlockPxWidth = _props.scaffoldBlockPxWidth, lowerSiblingCounts = _props.lowerSiblingCounts, connectDropTarget = _props.connectDropTarget, isOver = _props.isOver, draggedNode = _props.draggedNode, canDrop = _props.canDrop, treeIndex = _props.treeIndex, otherProps = (_props.customCanDrop, 
                    _props.dragHover, _props.getNodeKey, _props.getPrevRow, _props.maxDepth, _props.node, 
                    _props.path, _props.treeData, _objectWithoutProperties(_props, [ "children", "listIndex", "swapFrom", "swapLength", "swapDepth", "scaffoldBlockPxWidth", "lowerSiblingCounts", "connectDropTarget", "isOver", "draggedNode", "canDrop", "treeIndex", "customCanDrop", "dragHover", "getNodeKey", "getPrevRow", "maxDepth", "node", "path", "treeData" ])), scaffoldBlockCount = lowerSiblingCounts.length, scaffold = [];
                    return lowerSiblingCounts.forEach(function(lowerSiblingCount, i) {
                        var lineClass = "";
                        if (lowerSiblingCount > 0 ? // At this level in the tree, the nodes had sibling nodes further down
                        // Top-left corner of the tree
                        // +-----+
                        // |     |
                        // |  +--+
                        // |  |  |
                        // +--+--+
                        lineClass = 0 === listIndex ? _treeNode2.default.lineHalfHorizontalRight + " " + _treeNode2.default.lineHalfVerticalBottom : i === scaffoldBlockCount - 1 ? _treeNode2.default.lineHalfHorizontalRight + " " + _treeNode2.default.lineFullVertical : _treeNode2.default.lineFullVertical : 0 === listIndex ? // Top-left corner of the tree, but has no siblings
                        // +-----+
                        // |     |
                        // |  +--+
                        // |     |
                        // +-----+
                        lineClass = _treeNode2.default.lineHalfHorizontalRight : i === scaffoldBlockCount - 1 && (// The last or only node in this level of the tree
                        // +--+--+
                        // |  |  |
                        // |  +--+
                        // |     |
                        // +-----+
                        lineClass = _treeNode2.default.lineHalfVerticalTop + " " + _treeNode2.default.lineHalfHorizontalRight), 
                        scaffold.push(_react2.default.createElement("div", {
                            key: "pre_" + i,
                            style: {
                                width: scaffoldBlockPxWidth
                            },
                            className: _treeNode2.default.lineBlock + " " + lineClass
                        })), treeIndex !== listIndex && i === swapDepth) {
                            // This row has been shifted, and is at the depth of
                            // the line pointing to the new destination
                            var highlightLineClass = "";
                            // This block is on the bottom (target) line
                            // This block points at the target block (where the row will go when released)
                            highlightLineClass = listIndex === swapFrom + swapLength - 1 ? _treeNode2.default.highlightBottomLeftCorner : treeIndex === swapFrom ? _treeNode2.default.highlightTopLeftCorner : _treeNode2.default.highlightLineVertical, 
                            scaffold.push(_react2.default.createElement("div", {
                                key: "highlight_" + i,
                                style: {
                                    width: scaffoldBlockPxWidth,
                                    left: scaffoldBlockPxWidth * i
                                },
                                className: _treeNode2.default.absoluteLineBlock + " " + highlightLineClass
                            }));
                        }
                    }), connectDropTarget(_react2.default.createElement("div", _extends({}, otherProps, {
                        className: _treeNode2.default.node
                    }), scaffold, _react2.default.createElement("div", {
                        className: _treeNode2.default.nodeContent,
                        style: {
                            left: scaffoldBlockPxWidth * scaffoldBlockCount
                        }
                    }, _react.Children.map(children, function(child) {
                        return (0, _react.cloneElement)(child, {
                            isOver: isOver,
                            canDrop: canDrop,
                            draggedNode: draggedNode
                        });
                    }))));
                }
            } ]), TreeNode;
        }(_react.Component);
        TreeNode.propTypes = {
            treeIndex: _react.PropTypes.number.isRequired,
            node: _react.PropTypes.object.isRequired,
            path: _react.PropTypes.arrayOf(_react.PropTypes.oneOfType([ _react.PropTypes.string, _react.PropTypes.number ])).isRequired,
            swapFrom: _react.PropTypes.number,
            swapDepth: _react.PropTypes.number,
            swapLength: _react.PropTypes.number,
            scaffoldBlockPxWidth: _react.PropTypes.number.isRequired,
            lowerSiblingCounts: _react.PropTypes.array.isRequired,
            listIndex: _react.PropTypes.number.isRequired,
            children: _react.PropTypes.node,
            // Drop target
            connectDropTarget: _react.PropTypes.func.isRequired,
            isOver: _react.PropTypes.bool.isRequired,
            canDrop: _react.PropTypes.bool,
            draggedNode: _react.PropTypes.object,
            customCanDrop: _react.PropTypes.func,
            // used in drag-and-drop-utils
            dragHover: _react.PropTypes.func.isRequired,
            // used in drag-and-drop-utils
            getNodeKey: _react.PropTypes.func,
            // used in drag-and-drop-utils
            getPrevRow: _react.PropTypes.func,
            // used in drag-and-drop-utils
            maxDepth: _react.PropTypes.number,
            // used in drag-and-drop-utils
            treeData: _react.PropTypes.arrayOf(_react.PropTypes.object)
        }, exports.default = TreeNode;
    }, /* 10 */
    /***/
    function(module, exports) {
        "use strict";
        /**
	 * Get the version of Internet Explorer in use, or undefined
	 *
	 * @return {?number} ieVersion - IE version as an integer, or undefined if not IE
	 */
        function getIEVersion() {
            var match = navigator.userAgent.match(/(?:MSIE |Trident\/.*; rv:)(\d+)/);
            return match ? parseInt(match[1], 10) : void 0;
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.getIEVersion = getIEVersion;
    }, /* 11 */
    /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        function getTargetDepth(dropTargetProps, monitor) {
            var dropTargetDepth = 0, draggedItem = monitor.getItem(), rowAbove = dropTargetProps.getPrevRow();
            rowAbove && (// Limit the length of the path to the deepest possible
            dropTargetDepth = Math.min(rowAbove.path.length, dropTargetProps.path.length));
            var blocksOffset = Math.round(monitor.getDifferenceFromInitialOffset().x / dropTargetProps.scaffoldBlockPxWidth), targetDepth = Math.min(dropTargetDepth, Math.max(0, draggedItem.path.length + blocksOffset - 1));
            // If a maxDepth is defined, constrain the target depth
            if ("undefined" != typeof dropTargetProps.maxDepth && null !== dropTargetProps.maxDepth) {
                var draggedNode = monitor.getItem().node, draggedChildDepth = (0, _treeDataUtils.getDepth)(draggedNode);
                targetDepth = Math.min(targetDepth, dropTargetProps.maxDepth - draggedChildDepth - 1);
            }
            return targetDepth;
        }
        function canDrop(dropTargetProps, monitor) {
            if (!monitor.isOver()) return !1;
            var rowAbove = dropTargetProps.getPrevRow(), abovePath = rowAbove ? rowAbove.path : [], aboveNode = rowAbove ? rowAbove.node : {}, targetDepth = getTargetDepth(dropTargetProps, monitor);
            // Cannot drop if we're adding to the children of the row above and
            //  the row above is a function
            if (targetDepth >= abovePath.length && "function" == typeof aboveNode.children) return !1;
            if ("function" == typeof dropTargetProps.customCanDrop) {
                var node = monitor.getItem().node, addedResult = (0, _memoizedTreeDataUtils.memoizedInsertNode)({
                    treeData: dropTargetProps.treeData,
                    newNode: node,
                    depth: targetDepth,
                    getNodeKey: dropTargetProps.getNodeKey,
                    minimumTreeIndex: dropTargetProps.listIndex,
                    expandParent: !0
                });
                return dropTargetProps.customCanDrop({
                    node: node,
                    prevPath: monitor.getItem().path,
                    prevParent: monitor.getItem().parentNode,
                    nextPath: addedResult.path,
                    nextParent: addedResult.parentNode
                });
            }
            return !0;
        }
        function nodeDragSourcePropInjection(connect, monitor) {
            return {
                connectDragSource: connect.dragSource(),
                connectDragPreview: connect.dragPreview(),
                isDragging: monitor.isDragging(),
                didDrop: monitor.didDrop()
            };
        }
        function nodeDropTargetPropInjection(connect, monitor) {
            var dragged = monitor.getItem();
            return {
                connectDropTarget: connect.dropTarget(),
                isOver: monitor.isOver(),
                canDrop: monitor.canDrop(),
                draggedNode: dragged ? dragged.node : null
            };
        }
        function dndWrapSource(el, type) {
            return (0, _reactDnd.DragSource)(type, nodeDragSource, nodeDragSourcePropInjection)(el);
        }
        function dndWrapTarget(el, type) {
            return (0, _reactDnd.DropTarget)(type, nodeDropTarget, nodeDropTargetPropInjection)(el);
        }
        function dndWrapRoot(el) {
            return (0, _reactDnd.DragDropContext)(_reactDndHtml5Backend2.default)(el);
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.dndWrapSource = dndWrapSource, exports.dndWrapTarget = dndWrapTarget, 
        exports.dndWrapRoot = dndWrapRoot;
        var _reactDnd = __webpack_require__(27), _reactDndHtml5Backend = __webpack_require__(28), _reactDndHtml5Backend2 = _interopRequireDefault(_reactDndHtml5Backend), _treeDataUtils = __webpack_require__(1), _memoizedTreeDataUtils = __webpack_require__(6), nodeDragSource = {
            beginDrag: function(props) {
                return props.startDrag(props), {
                    node: props.node,
                    parentNode: props.parentNode,
                    path: props.path
                };
            },
            endDrag: function(props, monitor) {
                props.endDrag(monitor.getDropResult());
            },
            isDragging: function(props, monitor) {
                var dropTargetNode = monitor.getItem().node, draggedNode = props.node;
                return draggedNode === dropTargetNode;
            }
        }, nodeDropTarget = {
            drop: function(dropTargetProps, monitor) {
                return {
                    node: monitor.getItem().node,
                    path: monitor.getItem().path,
                    minimumTreeIndex: dropTargetProps.treeIndex,
                    depth: getTargetDepth(dropTargetProps, monitor)
                };
            },
            hover: function(dropTargetProps, monitor) {
                var targetDepth = getTargetDepth(dropTargetProps, monitor), draggedNode = monitor.getItem().node, needsRedraw = // Redraw if hovered above different nodes
                dropTargetProps.node !== draggedNode || // Or hovered above the same node but at a different depth
                targetDepth !== dropTargetProps.path.length - 1;
                needsRedraw && dropTargetProps.dragHover({
                    node: draggedNode,
                    path: monitor.getItem().path,
                    minimumTreeIndex: dropTargetProps.listIndex,
                    depth: targetDepth
                });
            },
            canDrop: canDrop
        };
    }, /* 12 */
    /***/
    function(module, exports) {
        "use strict";
        function _toConsumableArray(arr) {
            if (Array.isArray(arr)) {
                for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];
                return arr2;
            }
            return Array.from(arr);
        }
        function swapRows(rows, fromIndex, toIndex) {
            var count = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 1, rowsWithoutMoved = [].concat(_toConsumableArray(rows.slice(0, fromIndex)), _toConsumableArray(rows.slice(fromIndex + count)));
            return [].concat(_toConsumableArray(rowsWithoutMoved.slice(0, toIndex)), _toConsumableArray(rows.slice(fromIndex, fromIndex + count)), _toConsumableArray(rowsWithoutMoved.slice(toIndex)));
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.swapRows = swapRows;
    }, /* 13 */
    /***/
    function(module, exports) {
        "use strict";
        function placeHoldersCount(b64) {
            var len = b64.length;
            if (len % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
            // the number of equal signs (place holders)
            // if there are two placeholders, than the two characters before it
            // represent one byte
            // if there is only one, then the three characters before it represent 2 bytes
            // this is just a cheap hack to not do indexOf twice
            return "=" === b64[len - 2] ? 2 : "=" === b64[len - 1] ? 1 : 0;
        }
        function byteLength(b64) {
            // base64 is 4/3 + up to two characters of the original data
            return 3 * b64.length / 4 - placeHoldersCount(b64);
        }
        function toByteArray(b64) {
            var i, j, l, tmp, placeHolders, arr, len = b64.length;
            placeHolders = placeHoldersCount(b64), arr = new Arr(3 * len / 4 - placeHolders), 
            // if there are placeholders, only get up to the last complete 4 chars
            l = placeHolders > 0 ? len - 4 : len;
            var L = 0;
            for (i = 0, j = 0; i < l; i += 4, j += 3) tmp = revLookup[b64.charCodeAt(i)] << 18 | revLookup[b64.charCodeAt(i + 1)] << 12 | revLookup[b64.charCodeAt(i + 2)] << 6 | revLookup[b64.charCodeAt(i + 3)], 
            arr[L++] = tmp >> 16 & 255, arr[L++] = tmp >> 8 & 255, arr[L++] = 255 & tmp;
            return 2 === placeHolders ? (tmp = revLookup[b64.charCodeAt(i)] << 2 | revLookup[b64.charCodeAt(i + 1)] >> 4, 
            arr[L++] = 255 & tmp) : 1 === placeHolders && (tmp = revLookup[b64.charCodeAt(i)] << 10 | revLookup[b64.charCodeAt(i + 1)] << 4 | revLookup[b64.charCodeAt(i + 2)] >> 2, 
            arr[L++] = tmp >> 8 & 255, arr[L++] = 255 & tmp), arr;
        }
        function tripletToBase64(num) {
            return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[63 & num];
        }
        function encodeChunk(uint8, start, end) {
            for (var tmp, output = [], i = start; i < end; i += 3) tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + uint8[i + 2], 
            output.push(tripletToBase64(tmp));
            return output.join("");
        }
        function fromByteArray(uint8) {
            // must be multiple of 3
            // go through the array every three bytes, we'll deal with trailing stuff later
            for (var tmp, len = uint8.length, extraBytes = len % 3, output = "", parts = [], maxChunkLength = 16383, i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) parts.push(encodeChunk(uint8, i, i + maxChunkLength > len2 ? len2 : i + maxChunkLength));
            // pad the end with zeros, but make sure to not forget the extra bytes
            return 1 === extraBytes ? (tmp = uint8[len - 1], output += lookup[tmp >> 2], output += lookup[tmp << 4 & 63], 
            output += "==") : 2 === extraBytes && (tmp = (uint8[len - 2] << 8) + uint8[len - 1], 
            output += lookup[tmp >> 10], output += lookup[tmp >> 4 & 63], output += lookup[tmp << 2 & 63], 
            output += "="), parts.push(output), parts.join("");
        }
        exports.byteLength = byteLength, exports.toByteArray = toByteArray, exports.fromByteArray = fromByteArray;
        for (var lookup = [], revLookup = [], Arr = "undefined" != typeof Uint8Array ? Uint8Array : Array, code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", i = 0, len = code.length; i < len; ++i) lookup[i] = code[i], 
        revLookup[code.charCodeAt(i)] = i;
        revLookup["-".charCodeAt(0)] = 62, revLookup["_".charCodeAt(0)] = 63;
    }, /* 14 */
    /***/
    function(module, exports, __webpack_require__) {
        /* WEBPACK VAR INJECTION */
        (function(global) {
            /*!
	 * The buffer module from node.js, for the browser.
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */
            /* eslint-disable no-proto */
            "use strict";
            function typedArraySupport() {
                try {
                    var arr = new Uint8Array(1);
                    // typed array instances can be augmented
                    // chrome 9-10 lack `subarray`
                    return arr.__proto__ = {
                        __proto__: Uint8Array.prototype,
                        foo: function() {
                            return 42;
                        }
                    }, 42 === arr.foo() && "function" == typeof arr.subarray && 0 === arr.subarray(1, 1).byteLength;
                } catch (e) {
                    return !1;
                }
            }
            function kMaxLength() {
                return Buffer.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
            }
            function createBuffer(that, length) {
                if (kMaxLength() < length) throw new RangeError("Invalid typed array length");
                // Return an augmented `Uint8Array` instance, for best performance
                // Fallback: Return an object instance of the Buffer class
                return Buffer.TYPED_ARRAY_SUPPORT ? (that = new Uint8Array(length), that.__proto__ = Buffer.prototype) : (null === that && (that = new Buffer(length)), 
                that.length = length), that;
            }
            /**
	 * The Buffer constructor returns instances of `Uint8Array` that have their
	 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
	 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
	 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
	 * returns a single octet.
	 *
	 * The `Uint8Array` prototype remains unmodified.
	 */
            function Buffer(arg, encodingOrOffset, length) {
                if (!(Buffer.TYPED_ARRAY_SUPPORT || this instanceof Buffer)) return new Buffer(arg, encodingOrOffset, length);
                // Common case.
                if ("number" == typeof arg) {
                    if ("string" == typeof encodingOrOffset) throw new Error("If encoding is specified then the first argument must be a string");
                    return allocUnsafe(this, arg);
                }
                return from(this, arg, encodingOrOffset, length);
            }
            function from(that, value, encodingOrOffset, length) {
                if ("number" == typeof value) throw new TypeError('"value" argument must not be a number');
                return "undefined" != typeof ArrayBuffer && value instanceof ArrayBuffer ? fromArrayBuffer(that, value, encodingOrOffset, length) : "string" == typeof value ? fromString(that, value, encodingOrOffset) : fromObject(that, value);
            }
            function assertSize(size) {
                if ("number" != typeof size) throw new TypeError('"size" argument must be a number');
                if (size < 0) throw new RangeError('"size" argument must not be negative');
            }
            function alloc(that, size, fill, encoding) {
                return assertSize(size), size <= 0 ? createBuffer(that, size) : void 0 !== fill ? "string" == typeof encoding ? createBuffer(that, size).fill(fill, encoding) : createBuffer(that, size).fill(fill) : createBuffer(that, size);
            }
            function allocUnsafe(that, size) {
                if (assertSize(size), that = createBuffer(that, size < 0 ? 0 : 0 | checked(size)), 
                !Buffer.TYPED_ARRAY_SUPPORT) for (var i = 0; i < size; ++i) that[i] = 0;
                return that;
            }
            function fromString(that, string, encoding) {
                if ("string" == typeof encoding && "" !== encoding || (encoding = "utf8"), !Buffer.isEncoding(encoding)) throw new TypeError('"encoding" must be a valid string encoding');
                var length = 0 | byteLength(string, encoding);
                that = createBuffer(that, length);
                var actual = that.write(string, encoding);
                // Writing a hex string, for example, that contains invalid characters will
                // cause everything after the first invalid character to be ignored. (e.g.
                // 'abxxcd' will be treated as 'ab')
                return actual !== length && (that = that.slice(0, actual)), that;
            }
            function fromArrayLike(that, array) {
                var length = array.length < 0 ? 0 : 0 | checked(array.length);
                that = createBuffer(that, length);
                for (var i = 0; i < length; i += 1) that[i] = 255 & array[i];
                return that;
            }
            function fromArrayBuffer(that, array, byteOffset, length) {
                // this throws if `array` is not a valid ArrayBuffer
                if (array.byteLength, byteOffset < 0 || array.byteLength < byteOffset) throw new RangeError("'offset' is out of bounds");
                if (array.byteLength < byteOffset + (length || 0)) throw new RangeError("'length' is out of bounds");
                // Return an augmented `Uint8Array` instance, for best performance
                // Fallback: Return an object instance of the Buffer class
                return array = void 0 === byteOffset && void 0 === length ? new Uint8Array(array) : void 0 === length ? new Uint8Array(array, byteOffset) : new Uint8Array(array, byteOffset, length), 
                Buffer.TYPED_ARRAY_SUPPORT ? (that = array, that.__proto__ = Buffer.prototype) : that = fromArrayLike(that, array), 
                that;
            }
            function fromObject(that, obj) {
                if (Buffer.isBuffer(obj)) {
                    var len = 0 | checked(obj.length);
                    return that = createBuffer(that, len), 0 === that.length ? that : (obj.copy(that, 0, 0, len), 
                    that);
                }
                if (obj) {
                    if ("undefined" != typeof ArrayBuffer && obj.buffer instanceof ArrayBuffer || "length" in obj) return "number" != typeof obj.length || isnan(obj.length) ? createBuffer(that, 0) : fromArrayLike(that, obj);
                    if ("Buffer" === obj.type && isArray(obj.data)) return fromArrayLike(that, obj.data);
                }
                throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
            }
            function checked(length) {
                // Note: cannot use `length < kMaxLength()` here because that fails when
                // length is NaN (which is otherwise coerced to zero.)
                if (length >= kMaxLength()) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + kMaxLength().toString(16) + " bytes");
                return 0 | length;
            }
            function SlowBuffer(length) {
                // eslint-disable-line eqeqeq
                return +length != length && (length = 0), Buffer.alloc(+length);
            }
            function byteLength(string, encoding) {
                if (Buffer.isBuffer(string)) return string.length;
                if ("undefined" != typeof ArrayBuffer && "function" == typeof ArrayBuffer.isView && (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) return string.byteLength;
                "string" != typeof string && (string = "" + string);
                var len = string.length;
                if (0 === len) return 0;
                for (// Use a for loop to avoid recursion
                var loweredCase = !1; ;) switch (encoding) {
                  case "ascii":
                  case "latin1":
                  case "binary":
                    return len;

                  case "utf8":
                  case "utf-8":
                  case void 0:
                    return utf8ToBytes(string).length;

                  case "ucs2":
                  case "ucs-2":
                  case "utf16le":
                  case "utf-16le":
                    return 2 * len;

                  case "hex":
                    return len >>> 1;

                  case "base64":
                    return base64ToBytes(string).length;

                  default:
                    if (loweredCase) return utf8ToBytes(string).length;
                    // assume utf8
                    encoding = ("" + encoding).toLowerCase(), loweredCase = !0;
                }
            }
            function slowToString(encoding, start, end) {
                var loweredCase = !1;
                // Return early if start > this.length. Done here to prevent potential uint32
                // coercion fail below.
                if (// No need to verify that "this.length <= MAX_UINT32" since it's a read-only
                // property of a typed array.
                // This behaves neither like String nor Uint8Array in that we set start/end
                // to their upper/lower bounds if the value passed is out of range.
                // undefined is handled specially as per ECMA-262 6th Edition,
                // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
                (void 0 === start || start < 0) && (start = 0), start > this.length) return "";
                if ((void 0 === end || end > this.length) && (end = this.length), end <= 0) return "";
                if (// Force coersion to uint32. This will also coerce falsey/NaN values to 0.
                end >>>= 0, start >>>= 0, end <= start) return "";
                for (encoding || (encoding = "utf8"); ;) switch (encoding) {
                  case "hex":
                    return hexSlice(this, start, end);

                  case "utf8":
                  case "utf-8":
                    return utf8Slice(this, start, end);

                  case "ascii":
                    return asciiSlice(this, start, end);

                  case "latin1":
                  case "binary":
                    return latin1Slice(this, start, end);

                  case "base64":
                    return base64Slice(this, start, end);

                  case "ucs2":
                  case "ucs-2":
                  case "utf16le":
                  case "utf-16le":
                    return utf16leSlice(this, start, end);

                  default:
                    if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
                    encoding = (encoding + "").toLowerCase(), loweredCase = !0;
                }
            }
            function swap(b, n, m) {
                var i = b[n];
                b[n] = b[m], b[m] = i;
            }
            // Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
            // OR the last index of `val` in `buffer` at offset <= `byteOffset`.
            //
            // Arguments:
            // - buffer - a Buffer to search
            // - val - a string, Buffer, or number
            // - byteOffset - an index into `buffer`; will be clamped to an int32
            // - encoding - an optional encoding, relevant is val is a string
            // - dir - true for indexOf, false for lastIndexOf
            function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
                // Empty buffer means no match
                if (0 === buffer.length) return -1;
                if (// Normalize byteOffset
                "string" == typeof byteOffset ? (encoding = byteOffset, byteOffset = 0) : byteOffset > 2147483647 ? byteOffset = 2147483647 : byteOffset < -2147483648 && (byteOffset = -2147483648), 
                byteOffset = +byteOffset, // Coerce to Number.
                isNaN(byteOffset) && (// byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
                byteOffset = dir ? 0 : buffer.length - 1), // Normalize byteOffset: negative offsets start from the end of the buffer
                byteOffset < 0 && (byteOffset = buffer.length + byteOffset), byteOffset >= buffer.length) {
                    if (dir) return -1;
                    byteOffset = buffer.length - 1;
                } else if (byteOffset < 0) {
                    if (!dir) return -1;
                    byteOffset = 0;
                }
                // Finally, search either indexOf (if dir is true) or lastIndexOf
                if (// Normalize val
                "string" == typeof val && (val = Buffer.from(val, encoding)), Buffer.isBuffer(val)) // Special case: looking for empty string/buffer always fails
                // Special case: looking for empty string/buffer always fails
                return 0 === val.length ? -1 : arrayIndexOf(buffer, val, byteOffset, encoding, dir);
                if ("number" == typeof val) // Search for a byte value [0-255]
                // Search for a byte value [0-255]
                return val &= 255, Buffer.TYPED_ARRAY_SUPPORT && "function" == typeof Uint8Array.prototype.indexOf ? dir ? Uint8Array.prototype.indexOf.call(buffer, val, byteOffset) : Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset) : arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir);
                throw new TypeError("val must be string, number or Buffer");
            }
            function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
                function read(buf, i) {
                    return 1 === indexSize ? buf[i] : buf.readUInt16BE(i * indexSize);
                }
                var indexSize = 1, arrLength = arr.length, valLength = val.length;
                if (void 0 !== encoding && (encoding = String(encoding).toLowerCase(), "ucs2" === encoding || "ucs-2" === encoding || "utf16le" === encoding || "utf-16le" === encoding)) {
                    if (arr.length < 2 || val.length < 2) return -1;
                    indexSize = 2, arrLength /= 2, valLength /= 2, byteOffset /= 2;
                }
                var i;
                if (dir) {
                    var foundIndex = -1;
                    for (i = byteOffset; i < arrLength; i++) if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
                        if (foundIndex === -1 && (foundIndex = i), i - foundIndex + 1 === valLength) return foundIndex * indexSize;
                    } else foundIndex !== -1 && (i -= i - foundIndex), foundIndex = -1;
                } else for (byteOffset + valLength > arrLength && (byteOffset = arrLength - valLength), 
                i = byteOffset; i >= 0; i--) {
                    for (var found = !0, j = 0; j < valLength; j++) if (read(arr, i + j) !== read(val, j)) {
                        found = !1;
                        break;
                    }
                    if (found) return i;
                }
                return -1;
            }
            function hexWrite(buf, string, offset, length) {
                offset = Number(offset) || 0;
                var remaining = buf.length - offset;
                length ? (length = Number(length), length > remaining && (length = remaining)) : length = remaining;
                // must be an even number of digits
                var strLen = string.length;
                if (strLen % 2 !== 0) throw new TypeError("Invalid hex string");
                length > strLen / 2 && (length = strLen / 2);
                for (var i = 0; i < length; ++i) {
                    var parsed = parseInt(string.substr(2 * i, 2), 16);
                    if (isNaN(parsed)) return i;
                    buf[offset + i] = parsed;
                }
                return i;
            }
            function utf8Write(buf, string, offset, length) {
                return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
            }
            function asciiWrite(buf, string, offset, length) {
                return blitBuffer(asciiToBytes(string), buf, offset, length);
            }
            function latin1Write(buf, string, offset, length) {
                return asciiWrite(buf, string, offset, length);
            }
            function base64Write(buf, string, offset, length) {
                return blitBuffer(base64ToBytes(string), buf, offset, length);
            }
            function ucs2Write(buf, string, offset, length) {
                return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
            }
            function base64Slice(buf, start, end) {
                return 0 === start && end === buf.length ? base64.fromByteArray(buf) : base64.fromByteArray(buf.slice(start, end));
            }
            function utf8Slice(buf, start, end) {
                end = Math.min(buf.length, end);
                for (var res = [], i = start; i < end; ) {
                    var firstByte = buf[i], codePoint = null, bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
                    if (i + bytesPerSequence <= end) {
                        var secondByte, thirdByte, fourthByte, tempCodePoint;
                        switch (bytesPerSequence) {
                          case 1:
                            firstByte < 128 && (codePoint = firstByte);
                            break;

                          case 2:
                            secondByte = buf[i + 1], 128 === (192 & secondByte) && (tempCodePoint = (31 & firstByte) << 6 | 63 & secondByte, 
                            tempCodePoint > 127 && (codePoint = tempCodePoint));
                            break;

                          case 3:
                            secondByte = buf[i + 1], thirdByte = buf[i + 2], 128 === (192 & secondByte) && 128 === (192 & thirdByte) && (tempCodePoint = (15 & firstByte) << 12 | (63 & secondByte) << 6 | 63 & thirdByte, 
                            tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343) && (codePoint = tempCodePoint));
                            break;

                          case 4:
                            secondByte = buf[i + 1], thirdByte = buf[i + 2], fourthByte = buf[i + 3], 128 === (192 & secondByte) && 128 === (192 & thirdByte) && 128 === (192 & fourthByte) && (tempCodePoint = (15 & firstByte) << 18 | (63 & secondByte) << 12 | (63 & thirdByte) << 6 | 63 & fourthByte, 
                            tempCodePoint > 65535 && tempCodePoint < 1114112 && (codePoint = tempCodePoint));
                        }
                    }
                    null === codePoint ? (// we did not generate a valid codePoint so insert a
                    // replacement char (U+FFFD) and advance only 1 byte
                    codePoint = 65533, bytesPerSequence = 1) : codePoint > 65535 && (// encode to utf16 (surrogate pair dance)
                    codePoint -= 65536, res.push(codePoint >>> 10 & 1023 | 55296), codePoint = 56320 | 1023 & codePoint), 
                    res.push(codePoint), i += bytesPerSequence;
                }
                return decodeCodePointsArray(res);
            }
            function decodeCodePointsArray(codePoints) {
                var len = codePoints.length;
                if (len <= MAX_ARGUMENTS_LENGTH) return String.fromCharCode.apply(String, codePoints);
                for (// Decode in chunks to avoid "call stack size exceeded".
                var res = "", i = 0; i < len; ) res += String.fromCharCode.apply(String, codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH));
                return res;
            }
            function asciiSlice(buf, start, end) {
                var ret = "";
                end = Math.min(buf.length, end);
                for (var i = start; i < end; ++i) ret += String.fromCharCode(127 & buf[i]);
                return ret;
            }
            function latin1Slice(buf, start, end) {
                var ret = "";
                end = Math.min(buf.length, end);
                for (var i = start; i < end; ++i) ret += String.fromCharCode(buf[i]);
                return ret;
            }
            function hexSlice(buf, start, end) {
                var len = buf.length;
                (!start || start < 0) && (start = 0), (!end || end < 0 || end > len) && (end = len);
                for (var out = "", i = start; i < end; ++i) out += toHex(buf[i]);
                return out;
            }
            function utf16leSlice(buf, start, end) {
                for (var bytes = buf.slice(start, end), res = "", i = 0; i < bytes.length; i += 2) res += String.fromCharCode(bytes[i] + 256 * bytes[i + 1]);
                return res;
            }
            /*
	 * Need to make sure that buffer isn't trying to write out of bounds.
	 */
            function checkOffset(offset, ext, length) {
                if (offset % 1 !== 0 || offset < 0) throw new RangeError("offset is not uint");
                if (offset + ext > length) throw new RangeError("Trying to access beyond buffer length");
            }
            function checkInt(buf, value, offset, ext, max, min) {
                if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance');
                if (value > max || value < min) throw new RangeError('"value" argument is out of bounds');
                if (offset + ext > buf.length) throw new RangeError("Index out of range");
            }
            function objectWriteUInt16(buf, value, offset, littleEndian) {
                value < 0 && (value = 65535 + value + 1);
                for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) buf[offset + i] = (value & 255 << 8 * (littleEndian ? i : 1 - i)) >>> 8 * (littleEndian ? i : 1 - i);
            }
            function objectWriteUInt32(buf, value, offset, littleEndian) {
                value < 0 && (value = 4294967295 + value + 1);
                for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) buf[offset + i] = value >>> 8 * (littleEndian ? i : 3 - i) & 255;
            }
            function checkIEEE754(buf, value, offset, ext, max, min) {
                if (offset + ext > buf.length) throw new RangeError("Index out of range");
                if (offset < 0) throw new RangeError("Index out of range");
            }
            function writeFloat(buf, value, offset, littleEndian, noAssert) {
                return noAssert || checkIEEE754(buf, value, offset, 4, 3.4028234663852886e38, -3.4028234663852886e38), 
                ieee754.write(buf, value, offset, littleEndian, 23, 4), offset + 4;
            }
            function writeDouble(buf, value, offset, littleEndian, noAssert) {
                return noAssert || checkIEEE754(buf, value, offset, 8, 1.7976931348623157e308, -1.7976931348623157e308), 
                ieee754.write(buf, value, offset, littleEndian, 52, 8), offset + 8;
            }
            function base64clean(str) {
                // Node converts strings with length < 2 to ''
                if (// Node strips out invalid characters like \n and \t from the string, base64-js does not
                str = stringtrim(str).replace(INVALID_BASE64_RE, ""), str.length < 2) return "";
                // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
                for (;str.length % 4 !== 0; ) str += "=";
                return str;
            }
            function stringtrim(str) {
                return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, "");
            }
            function toHex(n) {
                return n < 16 ? "0" + n.toString(16) : n.toString(16);
            }
            function utf8ToBytes(string, units) {
                units = units || 1 / 0;
                for (var codePoint, length = string.length, leadSurrogate = null, bytes = [], i = 0; i < length; ++i) {
                    // is surrogate component
                    if (codePoint = string.charCodeAt(i), codePoint > 55295 && codePoint < 57344) {
                        // last char was a lead
                        if (!leadSurrogate) {
                            // no lead yet
                            if (codePoint > 56319) {
                                // unexpected trail
                                (units -= 3) > -1 && bytes.push(239, 191, 189);
                                continue;
                            }
                            if (i + 1 === length) {
                                // unpaired lead
                                (units -= 3) > -1 && bytes.push(239, 191, 189);
                                continue;
                            }
                            // valid lead
                            leadSurrogate = codePoint;
                            continue;
                        }
                        // 2 leads in a row
                        if (codePoint < 56320) {
                            (units -= 3) > -1 && bytes.push(239, 191, 189), leadSurrogate = codePoint;
                            continue;
                        }
                        // valid surrogate pair
                        codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
                    } else leadSurrogate && (units -= 3) > -1 && bytes.push(239, 191, 189);
                    // encode utf8
                    if (leadSurrogate = null, codePoint < 128) {
                        if ((units -= 1) < 0) break;
                        bytes.push(codePoint);
                    } else if (codePoint < 2048) {
                        if ((units -= 2) < 0) break;
                        bytes.push(codePoint >> 6 | 192, 63 & codePoint | 128);
                    } else if (codePoint < 65536) {
                        if ((units -= 3) < 0) break;
                        bytes.push(codePoint >> 12 | 224, codePoint >> 6 & 63 | 128, 63 & codePoint | 128);
                    } else {
                        if (!(codePoint < 1114112)) throw new Error("Invalid code point");
                        if ((units -= 4) < 0) break;
                        bytes.push(codePoint >> 18 | 240, codePoint >> 12 & 63 | 128, codePoint >> 6 & 63 | 128, 63 & codePoint | 128);
                    }
                }
                return bytes;
            }
            function asciiToBytes(str) {
                for (var byteArray = [], i = 0; i < str.length; ++i) // Node's code seems to be doing this and not & 0x7F..
                byteArray.push(255 & str.charCodeAt(i));
                return byteArray;
            }
            function utf16leToBytes(str, units) {
                for (var c, hi, lo, byteArray = [], i = 0; i < str.length && !((units -= 2) < 0); ++i) c = str.charCodeAt(i), 
                hi = c >> 8, lo = c % 256, byteArray.push(lo), byteArray.push(hi);
                return byteArray;
            }
            function base64ToBytes(str) {
                return base64.toByteArray(base64clean(str));
            }
            function blitBuffer(src, dst, offset, length) {
                for (var i = 0; i < length && !(i + offset >= dst.length || i >= src.length); ++i) dst[i + offset] = src[i];
                return i;
            }
            function isnan(val) {
                return val !== val;
            }
            var base64 = __webpack_require__(13), ieee754 = __webpack_require__(19), isArray = __webpack_require__(20);
            exports.Buffer = Buffer, exports.SlowBuffer = SlowBuffer, exports.INSPECT_MAX_BYTES = 50, 
            /**
	 * If `Buffer.TYPED_ARRAY_SUPPORT`:
	 *   === true    Use Uint8Array implementation (fastest)
	 *   === false   Use Object implementation (most compatible, even IE6)
	 *
	 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
	 * Opera 11.6+, iOS 4.2+.
	 *
	 * Due to various browser bugs, sometimes the Object implementation will be used even
	 * when the browser supports typed arrays.
	 *
	 * Note:
	 *
	 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
	 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
	 *
	 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
	 *
	 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
	 *     incorrect length in some situations.
	
	 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
	 * get the Object implementation, which is slower but behaves correctly.
	 */
            Buffer.TYPED_ARRAY_SUPPORT = void 0 !== global.TYPED_ARRAY_SUPPORT ? global.TYPED_ARRAY_SUPPORT : typedArraySupport(), 
            /*
	 * Export kMaxLength after typed array support is determined.
	 */
            exports.kMaxLength = kMaxLength(), Buffer.poolSize = 8192, // not used by this implementation
            // TODO: Legacy, not needed anymore. Remove in next major version.
            Buffer._augment = function(arr) {
                return arr.__proto__ = Buffer.prototype, arr;
            }, /**
	 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
	 * if value is a number.
	 * Buffer.from(str[, encoding])
	 * Buffer.from(array)
	 * Buffer.from(buffer)
	 * Buffer.from(arrayBuffer[, byteOffset[, length]])
	 **/
            Buffer.from = function(value, encodingOrOffset, length) {
                return from(null, value, encodingOrOffset, length);
            }, Buffer.TYPED_ARRAY_SUPPORT && (Buffer.prototype.__proto__ = Uint8Array.prototype, 
            Buffer.__proto__ = Uint8Array, "undefined" != typeof Symbol && Symbol.species && Buffer[Symbol.species] === Buffer && // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
            Object.defineProperty(Buffer, Symbol.species, {
                value: null,
                configurable: !0
            })), /**
	 * Creates a new filled Buffer instance.
	 * alloc(size[, fill[, encoding]])
	 **/
            Buffer.alloc = function(size, fill, encoding) {
                return alloc(null, size, fill, encoding);
            }, /**
	 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
	 * */
            Buffer.allocUnsafe = function(size) {
                return allocUnsafe(null, size);
            }, /**
	 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
	 */
            Buffer.allocUnsafeSlow = function(size) {
                return allocUnsafe(null, size);
            }, Buffer.isBuffer = function(b) {
                return !(null == b || !b._isBuffer);
            }, Buffer.compare = function(a, b) {
                if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) throw new TypeError("Arguments must be Buffers");
                if (a === b) return 0;
                for (var x = a.length, y = b.length, i = 0, len = Math.min(x, y); i < len; ++i) if (a[i] !== b[i]) {
                    x = a[i], y = b[i];
                    break;
                }
                return x < y ? -1 : y < x ? 1 : 0;
            }, Buffer.isEncoding = function(encoding) {
                switch (String(encoding).toLowerCase()) {
                  case "hex":
                  case "utf8":
                  case "utf-8":
                  case "ascii":
                  case "latin1":
                  case "binary":
                  case "base64":
                  case "ucs2":
                  case "ucs-2":
                  case "utf16le":
                  case "utf-16le":
                    return !0;

                  default:
                    return !1;
                }
            }, Buffer.concat = function(list, length) {
                if (!isArray(list)) throw new TypeError('"list" argument must be an Array of Buffers');
                if (0 === list.length) return Buffer.alloc(0);
                var i;
                if (void 0 === length) for (length = 0, i = 0; i < list.length; ++i) length += list[i].length;
                var buffer = Buffer.allocUnsafe(length), pos = 0;
                for (i = 0; i < list.length; ++i) {
                    var buf = list[i];
                    if (!Buffer.isBuffer(buf)) throw new TypeError('"list" argument must be an Array of Buffers');
                    buf.copy(buffer, pos), pos += buf.length;
                }
                return buffer;
            }, Buffer.byteLength = byteLength, // The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
            // Buffer instances.
            Buffer.prototype._isBuffer = !0, Buffer.prototype.swap16 = function() {
                var len = this.length;
                if (len % 2 !== 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
                for (var i = 0; i < len; i += 2) swap(this, i, i + 1);
                return this;
            }, Buffer.prototype.swap32 = function() {
                var len = this.length;
                if (len % 4 !== 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
                for (var i = 0; i < len; i += 4) swap(this, i, i + 3), swap(this, i + 1, i + 2);
                return this;
            }, Buffer.prototype.swap64 = function() {
                var len = this.length;
                if (len % 8 !== 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
                for (var i = 0; i < len; i += 8) swap(this, i, i + 7), swap(this, i + 1, i + 6), 
                swap(this, i + 2, i + 5), swap(this, i + 3, i + 4);
                return this;
            }, Buffer.prototype.toString = function() {
                var length = 0 | this.length;
                return 0 === length ? "" : 0 === arguments.length ? utf8Slice(this, 0, length) : slowToString.apply(this, arguments);
            }, Buffer.prototype.equals = function(b) {
                if (!Buffer.isBuffer(b)) throw new TypeError("Argument must be a Buffer");
                return this === b || 0 === Buffer.compare(this, b);
            }, Buffer.prototype.inspect = function() {
                var str = "", max = exports.INSPECT_MAX_BYTES;
                return this.length > 0 && (str = this.toString("hex", 0, max).match(/.{2}/g).join(" "), 
                this.length > max && (str += " ... ")), "<Buffer " + str + ">";
            }, Buffer.prototype.compare = function(target, start, end, thisStart, thisEnd) {
                if (!Buffer.isBuffer(target)) throw new TypeError("Argument must be a Buffer");
                if (void 0 === start && (start = 0), void 0 === end && (end = target ? target.length : 0), 
                void 0 === thisStart && (thisStart = 0), void 0 === thisEnd && (thisEnd = this.length), 
                start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) throw new RangeError("out of range index");
                if (thisStart >= thisEnd && start >= end) return 0;
                if (thisStart >= thisEnd) return -1;
                if (start >= end) return 1;
                if (start >>>= 0, end >>>= 0, thisStart >>>= 0, thisEnd >>>= 0, this === target) return 0;
                for (var x = thisEnd - thisStart, y = end - start, len = Math.min(x, y), thisCopy = this.slice(thisStart, thisEnd), targetCopy = target.slice(start, end), i = 0; i < len; ++i) if (thisCopy[i] !== targetCopy[i]) {
                    x = thisCopy[i], y = targetCopy[i];
                    break;
                }
                return x < y ? -1 : y < x ? 1 : 0;
            }, Buffer.prototype.includes = function(val, byteOffset, encoding) {
                return this.indexOf(val, byteOffset, encoding) !== -1;
            }, Buffer.prototype.indexOf = function(val, byteOffset, encoding) {
                return bidirectionalIndexOf(this, val, byteOffset, encoding, !0);
            }, Buffer.prototype.lastIndexOf = function(val, byteOffset, encoding) {
                return bidirectionalIndexOf(this, val, byteOffset, encoding, !1);
            }, Buffer.prototype.write = function(string, offset, length, encoding) {
                // Buffer#write(string)
                if (void 0 === offset) encoding = "utf8", length = this.length, offset = 0; else if (void 0 === length && "string" == typeof offset) encoding = offset, 
                length = this.length, offset = 0; else {
                    if (!isFinite(offset)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
                    offset |= 0, isFinite(length) ? (length |= 0, void 0 === encoding && (encoding = "utf8")) : (encoding = length, 
                    length = void 0);
                }
                var remaining = this.length - offset;
                if ((void 0 === length || length > remaining) && (length = remaining), string.length > 0 && (length < 0 || offset < 0) || offset > this.length) throw new RangeError("Attempt to write outside buffer bounds");
                encoding || (encoding = "utf8");
                for (var loweredCase = !1; ;) switch (encoding) {
                  case "hex":
                    return hexWrite(this, string, offset, length);

                  case "utf8":
                  case "utf-8":
                    return utf8Write(this, string, offset, length);

                  case "ascii":
                    return asciiWrite(this, string, offset, length);

                  case "latin1":
                  case "binary":
                    return latin1Write(this, string, offset, length);

                  case "base64":
                    // Warning: maxLength not taken into account in base64Write
                    return base64Write(this, string, offset, length);

                  case "ucs2":
                  case "ucs-2":
                  case "utf16le":
                  case "utf-16le":
                    return ucs2Write(this, string, offset, length);

                  default:
                    if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
                    encoding = ("" + encoding).toLowerCase(), loweredCase = !0;
                }
            }, Buffer.prototype.toJSON = function() {
                return {
                    type: "Buffer",
                    data: Array.prototype.slice.call(this._arr || this, 0)
                };
            };
            // Based on http://stackoverflow.com/a/22747272/680742, the browser with
            // the lowest limit is Chrome, with 0x10000 args.
            // We go 1 magnitude less, for safety
            var MAX_ARGUMENTS_LENGTH = 4096;
            Buffer.prototype.slice = function(start, end) {
                var len = this.length;
                start = ~~start, end = void 0 === end ? len : ~~end, start < 0 ? (start += len, 
                start < 0 && (start = 0)) : start > len && (start = len), end < 0 ? (end += len, 
                end < 0 && (end = 0)) : end > len && (end = len), end < start && (end = start);
                var newBuf;
                if (Buffer.TYPED_ARRAY_SUPPORT) newBuf = this.subarray(start, end), newBuf.__proto__ = Buffer.prototype; else {
                    var sliceLen = end - start;
                    newBuf = new Buffer(sliceLen, void 0);
                    for (var i = 0; i < sliceLen; ++i) newBuf[i] = this[i + start];
                }
                return newBuf;
            }, Buffer.prototype.readUIntLE = function(offset, byteLength, noAssert) {
                offset |= 0, byteLength |= 0, noAssert || checkOffset(offset, byteLength, this.length);
                for (var val = this[offset], mul = 1, i = 0; ++i < byteLength && (mul *= 256); ) val += this[offset + i] * mul;
                return val;
            }, Buffer.prototype.readUIntBE = function(offset, byteLength, noAssert) {
                offset |= 0, byteLength |= 0, noAssert || checkOffset(offset, byteLength, this.length);
                for (var val = this[offset + --byteLength], mul = 1; byteLength > 0 && (mul *= 256); ) val += this[offset + --byteLength] * mul;
                return val;
            }, Buffer.prototype.readUInt8 = function(offset, noAssert) {
                return noAssert || checkOffset(offset, 1, this.length), this[offset];
            }, Buffer.prototype.readUInt16LE = function(offset, noAssert) {
                return noAssert || checkOffset(offset, 2, this.length), this[offset] | this[offset + 1] << 8;
            }, Buffer.prototype.readUInt16BE = function(offset, noAssert) {
                return noAssert || checkOffset(offset, 2, this.length), this[offset] << 8 | this[offset + 1];
            }, Buffer.prototype.readUInt32LE = function(offset, noAssert) {
                return noAssert || checkOffset(offset, 4, this.length), (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + 16777216 * this[offset + 3];
            }, Buffer.prototype.readUInt32BE = function(offset, noAssert) {
                return noAssert || checkOffset(offset, 4, this.length), 16777216 * this[offset] + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
            }, Buffer.prototype.readIntLE = function(offset, byteLength, noAssert) {
                offset |= 0, byteLength |= 0, noAssert || checkOffset(offset, byteLength, this.length);
                for (var val = this[offset], mul = 1, i = 0; ++i < byteLength && (mul *= 256); ) val += this[offset + i] * mul;
                return mul *= 128, val >= mul && (val -= Math.pow(2, 8 * byteLength)), val;
            }, Buffer.prototype.readIntBE = function(offset, byteLength, noAssert) {
                offset |= 0, byteLength |= 0, noAssert || checkOffset(offset, byteLength, this.length);
                for (var i = byteLength, mul = 1, val = this[offset + --i]; i > 0 && (mul *= 256); ) val += this[offset + --i] * mul;
                return mul *= 128, val >= mul && (val -= Math.pow(2, 8 * byteLength)), val;
            }, Buffer.prototype.readInt8 = function(offset, noAssert) {
                return noAssert || checkOffset(offset, 1, this.length), 128 & this[offset] ? (255 - this[offset] + 1) * -1 : this[offset];
            }, Buffer.prototype.readInt16LE = function(offset, noAssert) {
                noAssert || checkOffset(offset, 2, this.length);
                var val = this[offset] | this[offset + 1] << 8;
                return 32768 & val ? 4294901760 | val : val;
            }, Buffer.prototype.readInt16BE = function(offset, noAssert) {
                noAssert || checkOffset(offset, 2, this.length);
                var val = this[offset + 1] | this[offset] << 8;
                return 32768 & val ? 4294901760 | val : val;
            }, Buffer.prototype.readInt32LE = function(offset, noAssert) {
                return noAssert || checkOffset(offset, 4, this.length), this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
            }, Buffer.prototype.readInt32BE = function(offset, noAssert) {
                return noAssert || checkOffset(offset, 4, this.length), this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
            }, Buffer.prototype.readFloatLE = function(offset, noAssert) {
                return noAssert || checkOffset(offset, 4, this.length), ieee754.read(this, offset, !0, 23, 4);
            }, Buffer.prototype.readFloatBE = function(offset, noAssert) {
                return noAssert || checkOffset(offset, 4, this.length), ieee754.read(this, offset, !1, 23, 4);
            }, Buffer.prototype.readDoubleLE = function(offset, noAssert) {
                return noAssert || checkOffset(offset, 8, this.length), ieee754.read(this, offset, !0, 52, 8);
            }, Buffer.prototype.readDoubleBE = function(offset, noAssert) {
                return noAssert || checkOffset(offset, 8, this.length), ieee754.read(this, offset, !1, 52, 8);
            }, Buffer.prototype.writeUIntLE = function(value, offset, byteLength, noAssert) {
                if (value = +value, offset |= 0, byteLength |= 0, !noAssert) {
                    var maxBytes = Math.pow(2, 8 * byteLength) - 1;
                    checkInt(this, value, offset, byteLength, maxBytes, 0);
                }
                var mul = 1, i = 0;
                for (this[offset] = 255 & value; ++i < byteLength && (mul *= 256); ) this[offset + i] = value / mul & 255;
                return offset + byteLength;
            }, Buffer.prototype.writeUIntBE = function(value, offset, byteLength, noAssert) {
                if (value = +value, offset |= 0, byteLength |= 0, !noAssert) {
                    var maxBytes = Math.pow(2, 8 * byteLength) - 1;
                    checkInt(this, value, offset, byteLength, maxBytes, 0);
                }
                var i = byteLength - 1, mul = 1;
                for (this[offset + i] = 255 & value; --i >= 0 && (mul *= 256); ) this[offset + i] = value / mul & 255;
                return offset + byteLength;
            }, Buffer.prototype.writeUInt8 = function(value, offset, noAssert) {
                return value = +value, offset |= 0, noAssert || checkInt(this, value, offset, 1, 255, 0), 
                Buffer.TYPED_ARRAY_SUPPORT || (value = Math.floor(value)), this[offset] = 255 & value, 
                offset + 1;
            }, Buffer.prototype.writeUInt16LE = function(value, offset, noAssert) {
                return value = +value, offset |= 0, noAssert || checkInt(this, value, offset, 2, 65535, 0), 
                Buffer.TYPED_ARRAY_SUPPORT ? (this[offset] = 255 & value, this[offset + 1] = value >>> 8) : objectWriteUInt16(this, value, offset, !0), 
                offset + 2;
            }, Buffer.prototype.writeUInt16BE = function(value, offset, noAssert) {
                return value = +value, offset |= 0, noAssert || checkInt(this, value, offset, 2, 65535, 0), 
                Buffer.TYPED_ARRAY_SUPPORT ? (this[offset] = value >>> 8, this[offset + 1] = 255 & value) : objectWriteUInt16(this, value, offset, !1), 
                offset + 2;
            }, Buffer.prototype.writeUInt32LE = function(value, offset, noAssert) {
                return value = +value, offset |= 0, noAssert || checkInt(this, value, offset, 4, 4294967295, 0), 
                Buffer.TYPED_ARRAY_SUPPORT ? (this[offset + 3] = value >>> 24, this[offset + 2] = value >>> 16, 
                this[offset + 1] = value >>> 8, this[offset] = 255 & value) : objectWriteUInt32(this, value, offset, !0), 
                offset + 4;
            }, Buffer.prototype.writeUInt32BE = function(value, offset, noAssert) {
                return value = +value, offset |= 0, noAssert || checkInt(this, value, offset, 4, 4294967295, 0), 
                Buffer.TYPED_ARRAY_SUPPORT ? (this[offset] = value >>> 24, this[offset + 1] = value >>> 16, 
                this[offset + 2] = value >>> 8, this[offset + 3] = 255 & value) : objectWriteUInt32(this, value, offset, !1), 
                offset + 4;
            }, Buffer.prototype.writeIntLE = function(value, offset, byteLength, noAssert) {
                if (value = +value, offset |= 0, !noAssert) {
                    var limit = Math.pow(2, 8 * byteLength - 1);
                    checkInt(this, value, offset, byteLength, limit - 1, -limit);
                }
                var i = 0, mul = 1, sub = 0;
                for (this[offset] = 255 & value; ++i < byteLength && (mul *= 256); ) value < 0 && 0 === sub && 0 !== this[offset + i - 1] && (sub = 1), 
                this[offset + i] = (value / mul >> 0) - sub & 255;
                return offset + byteLength;
            }, Buffer.prototype.writeIntBE = function(value, offset, byteLength, noAssert) {
                if (value = +value, offset |= 0, !noAssert) {
                    var limit = Math.pow(2, 8 * byteLength - 1);
                    checkInt(this, value, offset, byteLength, limit - 1, -limit);
                }
                var i = byteLength - 1, mul = 1, sub = 0;
                for (this[offset + i] = 255 & value; --i >= 0 && (mul *= 256); ) value < 0 && 0 === sub && 0 !== this[offset + i + 1] && (sub = 1), 
                this[offset + i] = (value / mul >> 0) - sub & 255;
                return offset + byteLength;
            }, Buffer.prototype.writeInt8 = function(value, offset, noAssert) {
                return value = +value, offset |= 0, noAssert || checkInt(this, value, offset, 1, 127, -128), 
                Buffer.TYPED_ARRAY_SUPPORT || (value = Math.floor(value)), value < 0 && (value = 255 + value + 1), 
                this[offset] = 255 & value, offset + 1;
            }, Buffer.prototype.writeInt16LE = function(value, offset, noAssert) {
                return value = +value, offset |= 0, noAssert || checkInt(this, value, offset, 2, 32767, -32768), 
                Buffer.TYPED_ARRAY_SUPPORT ? (this[offset] = 255 & value, this[offset + 1] = value >>> 8) : objectWriteUInt16(this, value, offset, !0), 
                offset + 2;
            }, Buffer.prototype.writeInt16BE = function(value, offset, noAssert) {
                return value = +value, offset |= 0, noAssert || checkInt(this, value, offset, 2, 32767, -32768), 
                Buffer.TYPED_ARRAY_SUPPORT ? (this[offset] = value >>> 8, this[offset + 1] = 255 & value) : objectWriteUInt16(this, value, offset, !1), 
                offset + 2;
            }, Buffer.prototype.writeInt32LE = function(value, offset, noAssert) {
                return value = +value, offset |= 0, noAssert || checkInt(this, value, offset, 4, 2147483647, -2147483648), 
                Buffer.TYPED_ARRAY_SUPPORT ? (this[offset] = 255 & value, this[offset + 1] = value >>> 8, 
                this[offset + 2] = value >>> 16, this[offset + 3] = value >>> 24) : objectWriteUInt32(this, value, offset, !0), 
                offset + 4;
            }, Buffer.prototype.writeInt32BE = function(value, offset, noAssert) {
                return value = +value, offset |= 0, noAssert || checkInt(this, value, offset, 4, 2147483647, -2147483648), 
                value < 0 && (value = 4294967295 + value + 1), Buffer.TYPED_ARRAY_SUPPORT ? (this[offset] = value >>> 24, 
                this[offset + 1] = value >>> 16, this[offset + 2] = value >>> 8, this[offset + 3] = 255 & value) : objectWriteUInt32(this, value, offset, !1), 
                offset + 4;
            }, Buffer.prototype.writeFloatLE = function(value, offset, noAssert) {
                return writeFloat(this, value, offset, !0, noAssert);
            }, Buffer.prototype.writeFloatBE = function(value, offset, noAssert) {
                return writeFloat(this, value, offset, !1, noAssert);
            }, Buffer.prototype.writeDoubleLE = function(value, offset, noAssert) {
                return writeDouble(this, value, offset, !0, noAssert);
            }, Buffer.prototype.writeDoubleBE = function(value, offset, noAssert) {
                return writeDouble(this, value, offset, !1, noAssert);
            }, // copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
            Buffer.prototype.copy = function(target, targetStart, start, end) {
                // Copy 0 bytes; we're done
                if (start || (start = 0), end || 0 === end || (end = this.length), targetStart >= target.length && (targetStart = target.length), 
                targetStart || (targetStart = 0), end > 0 && end < start && (end = start), end === start) return 0;
                if (0 === target.length || 0 === this.length) return 0;
                // Fatal error conditions
                if (targetStart < 0) throw new RangeError("targetStart out of bounds");
                if (start < 0 || start >= this.length) throw new RangeError("sourceStart out of bounds");
                if (end < 0) throw new RangeError("sourceEnd out of bounds");
                // Are we oob?
                end > this.length && (end = this.length), target.length - targetStart < end - start && (end = target.length - targetStart + start);
                var i, len = end - start;
                if (this === target && start < targetStart && targetStart < end) // descending copy from end
                for (i = len - 1; i >= 0; --i) target[i + targetStart] = this[i + start]; else if (len < 1e3 || !Buffer.TYPED_ARRAY_SUPPORT) // ascending copy from start
                for (i = 0; i < len; ++i) target[i + targetStart] = this[i + start]; else Uint8Array.prototype.set.call(target, this.subarray(start, start + len), targetStart);
                return len;
            }, // Usage:
            //    buffer.fill(number[, offset[, end]])
            //    buffer.fill(buffer[, offset[, end]])
            //    buffer.fill(string[, offset[, end]][, encoding])
            Buffer.prototype.fill = function(val, start, end, encoding) {
                // Handle string cases:
                if ("string" == typeof val) {
                    if ("string" == typeof start ? (encoding = start, start = 0, end = this.length) : "string" == typeof end && (encoding = end, 
                    end = this.length), 1 === val.length) {
                        var code = val.charCodeAt(0);
                        code < 256 && (val = code);
                    }
                    if (void 0 !== encoding && "string" != typeof encoding) throw new TypeError("encoding must be a string");
                    if ("string" == typeof encoding && !Buffer.isEncoding(encoding)) throw new TypeError("Unknown encoding: " + encoding);
                } else "number" == typeof val && (val &= 255);
                // Invalid ranges are not set to a default, so can range check early.
                if (start < 0 || this.length < start || this.length < end) throw new RangeError("Out of range index");
                if (end <= start) return this;
                start >>>= 0, end = void 0 === end ? this.length : end >>> 0, val || (val = 0);
                var i;
                if ("number" == typeof val) for (i = start; i < end; ++i) this[i] = val; else {
                    var bytes = Buffer.isBuffer(val) ? val : utf8ToBytes(new Buffer(val, encoding).toString()), len = bytes.length;
                    for (i = 0; i < end - start; ++i) this[i + start] = bytes[i % len];
                }
                return this;
            };
            // HELPER FUNCTIONS
            // ================
            var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g;
        }).call(exports, function() {
            return this;
        }());
    }, /* 15 */
    /***/
    function(module, exports, __webpack_require__) {
        exports = module.exports = __webpack_require__(2)(void 0), // imports
        // module
        exports.push([ module.id, ".ReactVirtualized__Table__headerRow{font-weight:700;text-transform:uppercase}.ReactVirtualized__Table__headerRow,.ReactVirtualized__Table__row{display:-ms-flexbox;display:-webkit-box;display:flex;-ms-flex-direction:row;-webkit-box-orient:horizontal;-webkit-box-direction:normal;flex-direction:row;-ms-flex-align:center;-webkit-box-align:center;align-items:center}.ReactVirtualized__Table__headerTruncatedText{display:inline-block;max-width:100%;white-space:nowrap;text-overflow:ellipsis;overflow:hidden}.ReactVirtualized__Table__headerColumn,.ReactVirtualized__Table__rowColumn{margin-right:10px;min-width:0}.ReactVirtualized__Table__rowColumn{text-overflow:ellipsis;white-space:nowrap}.ReactVirtualized__Table__headerColumn:first-of-type,.ReactVirtualized__Table__rowColumn:first-of-type{margin-left:10px}.ReactVirtualized__Table__sortableHeaderColumn{cursor:pointer}.ReactVirtualized__Table__sortableHeaderIconContainer{display:-ms-flexbox;display:-webkit-box;display:flex;-ms-flex-align:center;-webkit-box-align:center;align-items:center}.ReactVirtualized__Table__sortableHeaderIcon{-ms-flex:0 0 24px;-webkit-box-flex:0;flex:0 0 24px;height:1em;width:1em;fill:currentColor}", "" ]);
    }, /* 16 */
    /***/
    function(module, exports, __webpack_require__) {
        exports = module.exports = __webpack_require__(2)(void 0), // imports
        // module
        exports.push([ module.id, '.rst__rowWrapper{padding:10px 10px 10px 0;height:100%;box-sizing:border-box}.rst__row{height:100%;white-space:nowrap;display:-webkit-box;display:-ms-flexbox;display:flex}.rst__row>*{box-sizing:border-box}.rst__rowCancelPad,.rst__rowLandingPad{border:none!important;box-shadow:none!important;outline:none!important}.rst__rowCancelPad *,.rst__rowLandingPad *{opacity:0!important}.rst__rowCancelPad:before,.rst__rowLandingPad:before{background-color:#add8e6;border:3px dashed #fff;content:"";position:absolute;top:0;right:0;bottom:0;left:0;z-index:-1}.rst__rowCancelPad:before{background-color:#e6a8ad}.rst__rowSearchMatch{outline:3px solid #0080ff}.rst__rowSearchFocus{outline:3px solid #fc6421}.rst__loadingHandle,.rst__moveHandle,.rst__rowContents,.rst__rowLabel,.rst__rowLabel_NoFlex,.rst__rowToolbar,.rst__rowToolbar_NoFlex,.rst__toolbarButton{display:inline-block;vertical-align:middle}.rst__rowContents{position:relative;height:100%;border:1px solid #bbb;border-left:none;box-shadow:0 2px 2px -2px;padding:0 5px 0 10px;border-radius:2px;min-width:230px;-webkit-box-flex:1;-ms-flex:1 0 auto;flex:1 0 auto;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;background-color:#fff}.rst__rowContentsDragDisabled{border-left:1px solid #bbb}.rst__rowLabel{padding-right:20px}.rst__rowLabel,.rst__rowToolbar{-webkit-box-flex:0;-ms-flex:0 1 auto;flex:0 1 auto}.rst__rowToolbar{display:-webkit-box;display:-ms-flexbox;display:flex}.rst__loadingHandle,.rst__moveHandle{height:100%;width:44px;background:#d9d9d9 url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MiIgaGVpZ2h0PSI0MiI+PGcgc3Ryb2tlPSIjRkZGIiBzdHJva2Utd2lkdGg9IjIuOSIgPjxwYXRoIGQ9Ik0xNCAxNS43aDE0LjQiLz48cGF0aCBkPSJNMTQgMjEuNGgxNC40Ii8+PHBhdGggZD0iTTE0IDI3LjFoMTQuNCIvPjwvZz4KPC9zdmc+") no-repeat 50%;border:1px solid #aaa;box-shadow:0 2px 2px -2px;cursor:move;border-radius:1px;z-index:1}.rst__loadingHandle{cursor:default;background:#d9d9d9}@-webkit-keyframes rst__pointFade{0%,19.999%,to{opacity:0}20%{opacity:1}}@keyframes rst__pointFade{0%,19.999%,to{opacity:0}20%{opacity:1}}.rst__loadingCircle{width:80%;height:80%;margin:10%;position:relative}.rst__loadingCirclePoint{width:100%;height:100%;position:absolute;left:0;top:0}.rst__loadingCirclePoint:before{content:"";display:block;margin:0 auto;width:11%;height:30%;background-color:#fff;border-radius:30%;-webkit-animation:rst__pointFade .8s infinite ease-in-out both;animation:rst__pointFade .8s infinite ease-in-out both}.rst__loadingCirclePoint:first-of-type{-webkit-transform:rotate(0deg);-ms-transform:rotate(0deg);transform:rotate(0deg)}.rst__loadingCirclePoint:first-of-type:before,.rst__loadingCirclePoint:nth-of-type(7):before{-webkit-animation-delay:-.8s;animation-delay:-.8s}.rst__loadingCirclePoint:nth-of-type(2){-webkit-transform:rotate(30deg);-ms-transform:rotate(30deg);transform:rotate(30deg)}.rst__loadingCirclePoint:nth-of-type(8){-webkit-transform:rotate(210deg);-ms-transform:rotate(210deg);transform:rotate(210deg)}.rst__loadingCirclePoint:nth-of-type(2):before,.rst__loadingCirclePoint:nth-of-type(8):before{-webkit-animation-delay:-666.66667ms;animation-delay:-666.66667ms}.rst__loadingCirclePoint:nth-of-type(3){-webkit-transform:rotate(60deg);-ms-transform:rotate(60deg);transform:rotate(60deg)}.rst__loadingCirclePoint:nth-of-type(9){-webkit-transform:rotate(240deg);-ms-transform:rotate(240deg);transform:rotate(240deg)}.rst__loadingCirclePoint:nth-of-type(3):before,.rst__loadingCirclePoint:nth-of-type(9):before{-webkit-animation-delay:-.53333333s;animation-delay:-.53333333s}.rst__loadingCirclePoint:nth-of-type(4){-webkit-transform:rotate(90deg);-ms-transform:rotate(90deg);transform:rotate(90deg)}.rst__loadingCirclePoint:nth-of-type(10){-webkit-transform:rotate(270deg);-ms-transform:rotate(270deg);transform:rotate(270deg)}.rst__loadingCirclePoint:nth-of-type(4):before,.rst__loadingCirclePoint:nth-of-type(10):before{-webkit-animation-delay:-.4s;animation-delay:-.4s}.rst__loadingCirclePoint:nth-of-type(5){-webkit-transform:rotate(120deg);-ms-transform:rotate(120deg);transform:rotate(120deg)}.rst__loadingCirclePoint:nth-of-type(11){-webkit-transform:rotate(300deg);-ms-transform:rotate(300deg);transform:rotate(300deg)}.rst__loadingCirclePoint:nth-of-type(5):before,.rst__loadingCirclePoint:nth-of-type(11):before{-webkit-animation-delay:-.26666667s;animation-delay:-.26666667s}.rst__loadingCirclePoint:nth-of-type(6){-webkit-transform:rotate(150deg);-ms-transform:rotate(150deg);transform:rotate(150deg)}.rst__loadingCirclePoint:nth-of-type(12){-webkit-transform:rotate(330deg);-ms-transform:rotate(330deg);transform:rotate(330deg)}.rst__loadingCirclePoint:nth-of-type(6):before,.rst__loadingCirclePoint:nth-of-type(12):before{-webkit-animation-delay:-.13333333s;animation-delay:-.13333333s}.rst__loadingCirclePoint:nth-of-type(7){-webkit-transform:rotate(180deg);-ms-transform:rotate(180deg);transform:rotate(180deg)}.rst__loadingCirclePoint:nth-of-type(13){-webkit-transform:rotate(1turn);-ms-transform:rotate(1turn);transform:rotate(1turn)}.rst__loadingCirclePoint:nth-of-type(7):before,.rst__loadingCirclePoint:nth-of-type(13):before{-webkit-animation-delay:0ms;animation-delay:0ms}.rst__rowTitle{font-weight:700}.rst__rowTitleWithSubtitle{font-size:85%;display:block;height:.8rem}.rst__rowSubtitle{font-size:70%;line-height:1}.rst__collapseButton,.rst__expandButton{-webkit-appearance:none;-moz-appearance:none;appearance:none;border:none;position:absolute;border-radius:100%;box-shadow:0 0 0 1px #000;width:16px;height:16px;top:50%;-webkit-transform:translate(-50%,-50%);-ms-transform:translate(-50%,-50%);transform:translate(-50%,-50%);cursor:pointer}.rst__collapseButton:focus,.rst__expandButton:focus{outline:none;box-shadow:0 0 0 1px #000,0 0 1px 3px #83bef9}.rst__collapseButton:hover:not(:active),.rst__expandButton:hover:not(:active){background-size:24px;height:20px;width:20px}.rst__collapseButton{background:#fff url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCI+PGNpcmNsZSBjeD0iOSIgY3k9IjkiIHI9IjgiIGZpbGw9IiNGRkYiLz48ZyBzdHJva2U9IiM5ODk4OTgiIHN0cm9rZS13aWR0aD0iMS45IiA+PHBhdGggZD0iTTQuNSA5aDkiLz48L2c+Cjwvc3ZnPg==") no-repeat 50%}.rst__expandButton{background:#fff url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCI+PGNpcmNsZSBjeD0iOSIgY3k9IjkiIHI9IjgiIGZpbGw9IiNGRkYiLz48ZyBzdHJva2U9IiM5ODk4OTgiIHN0cm9rZS13aWR0aD0iMS45IiA+PHBhdGggZD0iTTQuNSA5aDkiLz48cGF0aCBkPSJNOSA0LjV2OSIvPjwvZz4KPC9zdmc+") no-repeat 50%}.rst__row_NoFlex:before,.rst__rowContents_NoFlex:before{content:"";display:inline-block;vertical-align:middle;height:100%}.rst__rowContents_NoFlex{display:inline-block}.rst__rowContents_NoFlex:after{content:"";display:inline-block;width:100%}.rst__rowLabel_NoFlex{width:50%}.rst__rowToolbar_NoFlex{text-align:right;width:50%}.rst__lineChildren{height:100%;display:inline-block;position:absolute}.rst__lineChildren:after{content:"";position:absolute;background-color:#000;width:1px;left:50%;bottom:0;height:10px}', "" ]), 
        // exports
        exports.locals = {
            rowWrapper: "rst__rowWrapper",
            row: "rst__row",
            rowLandingPad: "rst__rowLandingPad",
            rowCancelPad: "rst__rowCancelPad",
            rowSearchMatch: "rst__rowSearchMatch",
            rowSearchFocus: "rst__rowSearchFocus",
            rowContents: "rst__rowContents",
            rowLabel: "rst__rowLabel",
            rowToolbar: "rst__rowToolbar",
            moveHandle: "rst__moveHandle",
            loadingHandle: "rst__loadingHandle",
            toolbarButton: "rst__toolbarButton",
            rowLabel_NoFlex: "rst__rowLabel_NoFlex",
            rowToolbar_NoFlex: "rst__rowToolbar_NoFlex",
            rowContentsDragDisabled: "rst__rowContentsDragDisabled",
            loadingCircle: "rst__loadingCircle",
            loadingCirclePoint: "rst__loadingCirclePoint",
            pointFade: "rst__pointFade",
            rowTitle: "rst__rowTitle",
            rowTitleWithSubtitle: "rst__rowTitleWithSubtitle",
            rowSubtitle: "rst__rowSubtitle",
            collapseButton: "rst__collapseButton",
            expandButton: "rst__expandButton",
            row_NoFlex: "rst__row_NoFlex",
            rowContents_NoFlex: "rst__rowContents_NoFlex",
            lineChildren: "rst__lineChildren"
        };
    }, /* 17 */
    /***/
    function(module, exports, __webpack_require__) {
        exports = module.exports = __webpack_require__(2)(void 0), // imports
        // module
        exports.push([ module.id, ".rst__tree{/*! This comment keeps Sass from deleting the empty rule */}.rst__virtualScrollOverride *{box-sizing:border-box}.ReactVirtualized__Grid__innerScrollContainer{overflow:visible!important}.ReactVirtualized__Grid{outline:none}", "" ]), 
        // exports
        exports.locals = {
            tree: "rst__tree",
            virtualScrollOverride: "rst__virtualScrollOverride"
        };
    }, /* 18 */
    /***/
    function(module, exports, __webpack_require__) {
        exports = module.exports = __webpack_require__(2)(void 0), // imports
        // module
        exports.push([ module.id, '.rst__node{min-width:100%;white-space:nowrap;position:relative}.rst__nodeContent{position:absolute;top:0;bottom:0}.rst__absoluteLineBlock,.rst__lineBlock{height:100%;position:relative;display:inline-block}.rst__absoluteLineBlock{position:absolute;top:0}.rst__lineFullVertical:after,.rst__lineHalfHorizontalRight:before,.rst__lineHalfVerticalBottom:after,.rst__lineHalfVerticalTop:after{position:absolute;content:"";background-color:#000}.rst__lineHalfHorizontalRight:before{height:1px;top:50%;right:0;width:50%}.rst__lineFullVertical:after,.rst__lineHalfVerticalBottom:after,.rst__lineHalfVerticalTop:after{width:1px;left:50%;top:0;height:100%}.rst__lineHalfVerticalBottom:after,.rst__lineHalfVerticalTop:after{top:0;height:50%}.rst__lineHalfVerticalBottom:after{top:auto;bottom:0}.rst__highlightLineVertical{z-index:3}.rst__highlightLineVertical:before{position:absolute;content:"";background-color:#36c2f6;width:8px;margin-left:-4px;left:50%;top:0;height:100%}@-webkit-keyframes rst__arrow-pulse{0%{-webkit-transform:translate(0);transform:translate(0);opacity:0}30%{-webkit-transform:translateY(300%);transform:translateY(300%);opacity:1}70%{-webkit-transform:translateY(700%);transform:translateY(700%);opacity:1}to{-webkit-transform:translateY(1000%);transform:translateY(1000%);opacity:0}}@keyframes rst__arrow-pulse{0%{-webkit-transform:translate(0);transform:translate(0);opacity:0}30%{-webkit-transform:translateY(300%);transform:translateY(300%);opacity:1}70%{-webkit-transform:translateY(700%);transform:translateY(700%);opacity:1}to{-webkit-transform:translateY(1000%);transform:translateY(1000%);opacity:0}}.rst__highlightLineVertical:after{content:"";position:absolute;height:0;margin-left:-4px;left:50%;top:0;border-left:4px solid transparent;border-right:4px solid transparent;border-top:4px solid #fff;-webkit-animation:rst__arrow-pulse 1s infinite linear both;animation:rst__arrow-pulse 1s infinite linear both}.rst__highlightTopLeftCorner:before{z-index:3;content:"";position:absolute;border-top:8px solid #36c2f6;border-left:8px solid #36c2f6;box-sizing:border-box;height:calc(50% + 4px);top:50%;margin-top:-4px;right:0;width:calc(50% + 4px)}.rst__highlightBottomLeftCorner{z-index:3}.rst__highlightBottomLeftCorner:before{content:"";position:absolute;border-bottom:8px solid #36c2f6;border-left:8px solid #36c2f6;box-sizing:border-box;height:calc(100% + 4px);top:0;right:12px;width:calc(50% - 8px)}.rst__highlightBottomLeftCorner:after{content:"";position:absolute;height:0;right:0;top:100%;margin-top:-12px;border-top:12px solid transparent;border-bottom:12px solid transparent;border-left:12px solid #36c2f6}', "" ]), 
        // exports
        exports.locals = {
            node: "rst__node",
            nodeContent: "rst__nodeContent",
            lineBlock: "rst__lineBlock",
            absoluteLineBlock: "rst__absoluteLineBlock",
            lineHalfHorizontalRight: "rst__lineHalfHorizontalRight",
            lineFullVertical: "rst__lineFullVertical",
            lineHalfVerticalTop: "rst__lineHalfVerticalTop",
            lineHalfVerticalBottom: "rst__lineHalfVerticalBottom",
            highlightLineVertical: "rst__highlightLineVertical",
            "arrow-pulse": "rst__arrow-pulse",
            highlightTopLeftCorner: "rst__highlightTopLeftCorner",
            highlightBottomLeftCorner: "rst__highlightBottomLeftCorner"
        };
    }, /* 19 */
    /***/
    function(module, exports) {
        exports.read = function(buffer, offset, isLE, mLen, nBytes) {
            var e, m, eLen = 8 * nBytes - mLen - 1, eMax = (1 << eLen) - 1, eBias = eMax >> 1, nBits = -7, i = isLE ? nBytes - 1 : 0, d = isLE ? -1 : 1, s = buffer[offset + i];
            for (i += d, e = s & (1 << -nBits) - 1, s >>= -nBits, nBits += eLen; nBits > 0; e = 256 * e + buffer[offset + i], 
            i += d, nBits -= 8) ;
            for (m = e & (1 << -nBits) - 1, e >>= -nBits, nBits += mLen; nBits > 0; m = 256 * m + buffer[offset + i], 
            i += d, nBits -= 8) ;
            if (0 === e) e = 1 - eBias; else {
                if (e === eMax) return m ? NaN : (s ? -1 : 1) * (1 / 0);
                m += Math.pow(2, mLen), e -= eBias;
            }
            return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
        }, exports.write = function(buffer, value, offset, isLE, mLen, nBytes) {
            var e, m, c, eLen = 8 * nBytes - mLen - 1, eMax = (1 << eLen) - 1, eBias = eMax >> 1, rt = 23 === mLen ? Math.pow(2, -24) - Math.pow(2, -77) : 0, i = isLE ? 0 : nBytes - 1, d = isLE ? 1 : -1, s = value < 0 || 0 === value && 1 / value < 0 ? 1 : 0;
            for (value = Math.abs(value), isNaN(value) || value === 1 / 0 ? (m = isNaN(value) ? 1 : 0, 
            e = eMax) : (e = Math.floor(Math.log(value) / Math.LN2), value * (c = Math.pow(2, -e)) < 1 && (e--, 
            c *= 2), value += e + eBias >= 1 ? rt / c : rt * Math.pow(2, 1 - eBias), value * c >= 2 && (e++, 
            c /= 2), e + eBias >= eMax ? (m = 0, e = eMax) : e + eBias >= 1 ? (m = (value * c - 1) * Math.pow(2, mLen), 
            e += eBias) : (m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen), e = 0)); mLen >= 8; buffer[offset + i] = 255 & m, 
            i += d, m /= 256, mLen -= 8) ;
            for (e = e << mLen | m, eLen += mLen; eLen > 0; buffer[offset + i] = 255 & e, i += d, 
            e /= 256, eLen -= 8) ;
            buffer[offset + i - d] |= 128 * s;
        };
    }, /* 20 */
    /***/
    function(module, exports) {
        var toString = {}.toString;
        module.exports = Array.isArray || function(arr) {
            return "[object Array]" == toString.call(arr);
        };
    }, /* 21 */
    /***/
    function(module, exports) {
        /**
	 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
	 * embed the css on the page. This breaks all relative urls because now they are relative to a
	 * bundle instead of the current page.
	 *
	 * One solution is to only use full urls, but that may be impossible.
	 *
	 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
	 *
	 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
	 *
	 */
        module.exports = function(css) {
            // get current location
            var location = "undefined" != typeof window && window.location;
            if (!location) throw new Error("fixUrls requires window.location");
            // blank or null?
            if (!css || "string" != typeof css) return css;
            var baseUrl = location.protocol + "//" + location.host, currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/"), fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
                // strip quotes (if they exist)
                var unquotedOrigUrl = origUrl.trim().replace(/^"(.*)"$/, function(o, $1) {
                    return $1;
                }).replace(/^'(.*)'$/, function(o, $1) {
                    return $1;
                });
                // already a full url? no change
                if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) return fullMatch;
                // convert the url to a full url
                var newUrl;
                // send back the fixed url(...)
                //TODO: should we add protocol?
                return newUrl = 0 === unquotedOrigUrl.indexOf("//") ? unquotedOrigUrl : 0 === unquotedOrigUrl.indexOf("/") ? baseUrl + unquotedOrigUrl : currentDir + unquotedOrigUrl.replace(/^\.\//, ""), 
                "url(" + JSON.stringify(newUrl) + ")";
            });
            // send back the fixed css
            return fixedCss;
        };
    }, /* 22 */
    /***/
    function(module, exports, __webpack_require__) {
        // style-loader: Adds some css to the DOM by adding a <style> tag
        // load the styles
        var content = __webpack_require__(15);
        "string" == typeof content && (content = [ [ module.id, content, "" ] ]);
        // add the styles to the DOM
        __webpack_require__(3)(content, {
            insertAt: "top"
        });
        content.locals && (module.exports = content.locals);
    }, /* 23 */
    /***/
    function(module, exports, __webpack_require__) {
        // style-loader: Adds some css to the DOM by adding a <style> tag
        // load the styles
        var content = __webpack_require__(16);
        "string" == typeof content && (content = [ [ module.id, content, "" ] ]);
        // add the styles to the DOM
        __webpack_require__(3)(content, {
            insertAt: "top"
        });
        content.locals && (module.exports = content.locals);
    }, /* 24 */
    /***/
    function(module, exports, __webpack_require__) {
        // style-loader: Adds some css to the DOM by adding a <style> tag
        // load the styles
        var content = __webpack_require__(17);
        "string" == typeof content && (content = [ [ module.id, content, "" ] ]);
        // add the styles to the DOM
        __webpack_require__(3)(content, {
            insertAt: "top"
        });
        content.locals && (module.exports = content.locals);
    }, /* 25 */
    /***/
    function(module, exports, __webpack_require__) {
        // style-loader: Adds some css to the DOM by adding a <style> tag
        // load the styles
        var content = __webpack_require__(18);
        "string" == typeof content && (content = [ [ module.id, content, "" ] ]);
        // add the styles to the DOM
        __webpack_require__(3)(content, {
            insertAt: "top"
        });
        content.locals && (module.exports = content.locals);
    }, /* 26 */
    /***/
    function(module, exports) {
        module.exports = __WEBPACK_EXTERNAL_MODULE_26__;
    }, /* 27 */
    /***/
    function(module, exports) {
        module.exports = __WEBPACK_EXTERNAL_MODULE_27__;
    }, /* 28 */
    /***/
    function(module, exports) {
        module.exports = __WEBPACK_EXTERNAL_MODULE_28__;
    }, /* 29 */
    /***/
    function(module, exports) {
        module.exports = __WEBPACK_EXTERNAL_MODULE_29__;
    }, /* 30 */
    /***/
    function(module, exports) {
        module.exports = __WEBPACK_EXTERNAL_MODULE_30__;
    } ]);
});
//# sourceMappingURL=react-sortable-tree.js.map