import Card from "./components/Card";
import Header from "./components/Header";
import Title from "./components/Title";

export default function Home() {
  return (
    <div>
      <div>
        <Header />
        <h1>カピバラブログ</h1>
        <Title text="カピバラブログ"/>
        <Card date="2024/10/19" title="タイトルタイトルタイトルタイトルタイトルタイトルタイトル"/>
      </div>
    </div>
  );
}
