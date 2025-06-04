import { useState, ChangeEvent, FormEvent } from "react";
import React from "react";
import { Container, Form, Label, Input, Textarea, Select, Button } from "./BoardInput_styles";

const BoardInput: React.FC = () => {
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        category: ""
    });

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log("제출된 데이터:", formData);
        // 서버로 데이터 전송 로직은 여기서!
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Label htmlFor="category">주제 선택</Label>
                <Select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                >
                    <option value="">주제를 선택하세요</option>
                    <option value="면접 자료 & 꿀팁 공유">면접 자료 & 꿀팁 공유</option>
                    <option value="면접 경험 공유">면접 경험 공유</option>
                    <option value="모의 면접 & 피드백">모의 면접 & 피드백</option>
                    <option value="취업고민 & 자유게시판">취업고민 & 자유게시판</option>
                    <option value="기업별 면접 트렌드 분석">기업별 면접 트렌드 분석</option>
                    <option value="전문가 & AI 피드백 제공">전문가 & AI 피드백 제공</option>
                </Select>

                <Label htmlFor="title">제목</Label>
                <Input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="제목을 입력하세요"
                    required
                />

                <Label htmlFor="content">내용</Label>
                <Textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    placeholder="내용을 입력하세요"
                    required
                />

                <Button type="submit">Enter</Button>
            </Form>
        </Container>
    );
};

export default BoardInput;
