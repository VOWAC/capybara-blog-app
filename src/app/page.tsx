import Button from "./components/Button";
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
        <Button>記事を作成</Button>
      </div>
    </div>
  );
}
