import { ItemData } from "../InterTypes";
import ItemCard from "../components/ItemCard";
import '../index.css';

export default{
    title: 'ItemCard',
    component: ItemCard
}
//@ts-ignore
const Template = (args: ItemData) => <ItemCard {...args} />;

export const Default = Template.bind({});
//@ts-ignore
Default.args = {
  name: 'Sample Item',
  current: 5,
  maxAmount: 10,
  color: 'green',
};

export const WithPhoto = Template.bind({});
//@ts-ignore
WithPhoto.args = {
  name: 'Sample Item',
  current: 5,
  maxAmount: 10,
  imageSrc: "https://i.kym-cdn.com/entries/icons/facebook/000/036/356/limmy.jpg",
  color: 'green',
};

export const Prioritized = Template.bind({});
//@ts-ignore
Prioritized.args = {
  name: 'Sample Item',
  current: 5,
  maxAmount: 10,
  imageSrc: "https://i.kym-cdn.com/entries/icons/facebook/000/036/356/limmy.jpg",
  color: 'green',
  isPrioritized: true
};