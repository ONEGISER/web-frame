/**
 * Copyright (c) 2013-Now http://jeesite.com All rights reserved.
 * No deletion without permission, or be held responsible to law.
 * @author ThinkGem
 */
import { Ref } from 'vue';
import { isEmpty } from '/@/utils/is';
import { useI18n } from '/@/hooks/web/useI18n';
import { dictDataTreeData } from '/@/api/sys/dictData';
import { useUserStore } from '/@/store/modules/user';
import { listToTree } from '/@/utils/helper/treeHelper';

const { t } = useI18n();
const userStore = useUserStore();

export function useDict() {
  const dictListMap = userStore.getPageCacheByKey('dictListMap', {});

  async function initDict(dictTypes: string[] | Set<string> = []) {
    if (!dictTypes) return;
    for (const dictType of dictTypes) {
      if (!dictListMap[dictType]) {
        // await new Promise((resolve) => setTimeout(resolve, 1000));
        dictListMap[dictType] = await dictDataTreeData({ dictType: dictType });
      }
    }
  }

  function getDictList(dictType: string): Recordable[] {
    return dictListMap[dictType] || [];
  }

  function getDictLabel(dictType: string, value?: string, defaultValue = t('未知')): string {
    const result: string[] = [];
    for (const item of getDictList(dictType)) {
      if (item && (',' + value + ',').includes(',' + item.value + ',')) {
        result.push(item.name);
      }
    }
    return result.length > 0 ? result.join(',') : defaultValue;
  }

  async function initGetDictList(dictType: string): Promise<Recordable[]> {
    if (isEmpty(dictType)) return [];
    await initDict([dictType]);
    return dictListMap[dictType] || [];
  }

  async function initSelectOptions(optionsRef: Ref, dictType?: string) {
    if (isEmpty(dictType)) return;
    await initDict([dictType]);
    const jeesiteDictList = getDictList(dictType);
    optionsRef.value = jeesiteDictList.map((item) => ({
      label: item.name,
      value: item.value,
      key: item.id,
    }));
  }

  async function initSelectTreeData(treeData: Ref, dictType: string, isListToTree: boolean) {
    if (isEmpty(dictType)) return;
    await initDict([dictType]);
    const jeesiteDictList = getDictList(dictType);
    if (isListToTree) {
      treeData.value = listToTree(jeesiteDictList);
    } else {
      treeData.value = jeesiteDictList;
    }
  }

  return {
    initDict,
    getDictList,
    getDictLabel,
    initGetDictList,
    initSelectOptions,
    initSelectTreeData,
  };
}
