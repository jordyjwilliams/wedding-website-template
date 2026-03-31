import { Select as SelectPrimitive } from 'bits-ui';

import GroupHeading from '$lib/components/ui/select/select-group-heading.svelte';
import Item from '$lib/components/ui/select/select-item.svelte';
import Content from '$lib/components/ui/select/select-content.svelte';
import Trigger from '$lib/components/ui/select/select-trigger.svelte';
import Separator from '$lib/components/ui/select/select-separator.svelte';
import ScrollDownButton from '$lib/components/ui/select/select-scroll-down-button.svelte';
import ScrollUpButton from '$lib/components/ui/select/select-scroll-up-button.svelte';

const Root = SelectPrimitive.Root;
const Group = SelectPrimitive.Group;

export {
  Root,
  Group,
  GroupHeading,
  Item,
  Content,
  Trigger,
  Separator,
  ScrollDownButton,
  ScrollUpButton,
  //
  Root as Select,
  Group as SelectGroup,
  GroupHeading as SelectGroupHeading,
  Item as SelectItem,
  Content as SelectContent,
  Trigger as SelectTrigger,
  Separator as SelectSeparator,
  ScrollDownButton as SelectScrollDownButton,
  ScrollUpButton as SelectScrollUpButton,
};
