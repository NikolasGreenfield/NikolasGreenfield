import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import HomeIcon from "@mui/icons-material/Home";
import GitHubIcon from "@mui/icons-material/GitHub";

import "./MainPage.scss";

class Graph {
    private static TitleFont: string = "70px Arial";
    private static TextFont: string = "30px Arial";
    private static TitleColor: string = "white";

    private Width: number = 0;
    private Height: number = 0;
    private Color: string = "";
    private ShowGridLines: boolean = false;
    private Items: GraphItem[] = [];

    constructor(
        width: number,
        height: number,
        color: string,
        showGridLines: boolean = false
    ) {
        this.Width = width;
        this.Height = height;
        this.Color = color;
        this.ShowGridLines = showGridLines;
    }

    /**
     * Sets the dimensions of the graph, resizing and relocating graph items if neccessary.
     *
     * @param width The new width of the graph.
     * @param height The new height of the graph.
     * @param canvas The canvas the graph will be rendered with.
     */
    public SetDimensions(
        width: number,
        height: number,
        canvas: CanvasRenderingContext2D
    ): void {
        if (this.Width == width && this.Height == height) {
            return;
        }

        // Set graph dimensions
        this.Width = width;
        this.Height = height;

        // Resize and re-locate graph items if needed.
        for (let i = 0; i < this.Items.length; i++) {
            this.Items[i].SetSize(100, 50);
        }
    }

    public AddItem(item: GraphItem): void {
        this.Items.push(item);
    }

    public AddItems(items: GraphItem[]): void {
        for (let i = 0; i < items.length; i++) {
            this.Items.push(items[i]);
        }
    }

    public Draw(canvas: CanvasRenderingContext2D): void {
        canvas.clearRect(0, 0, this.Width, this.Height);

        // Draw grid lines
        if (this.ShowGridLines) {
        }

        /*
        // Draw their lines to the center first to avoid overlap.
        if (this.HasLines) {
            for (let i = 0; i < this.Blocks.length; i++) {
                let curr: TextBlock = this.Blocks[i];
                canvas.moveTo(this.Width / 2, this.Height / 2);
                canvas.lineTo(curr.XPos + curr.Width / 2, curr.YPos + curr.Height / 2);
                canvas.stroke();
            }
        }
        */

        // Draw the graph items
        for (let i = 0; i < this.Items.length; i++) {
            let curr: GraphItem = this.Items[i];
            
            // Draw rectangle around Text.
            canvas.beginPath();
            canvas.fillStyle = "red";
            canvas.fillRect(curr.X, curr.Y, curr.Width, curr.Height);
            canvas.stroke();

            // Draw Text
            canvas.font = "30px Arial";
            canvas.textAlign = "center";
            canvas.fillStyle = "black";
            canvas.fillText(
                curr.Text,
                curr.X + curr.Width / 2,
                curr.Y + curr.Height * 0.8
            );
        }
    }
}

/**
 * Represents an individual item within the graph, which can have sub items attached to it.
 */
class GraphItem {
    public X: number = 0;
    public Y: number = 0;
    public Width: number = 0;
    public Height: number = 0;
    public Text: string;
    public Tier: Tiers;

    constructor(text: string, tier: Tiers) {
        this.Text = text;
        this.Tier = tier;
    }

    public SetPosition(x: number, y: number) {
        this.X = x;
        this.Y = y;
    }

    public SetSize(width: number, height: number) {
        this.Width = width;
        this.Height = height;
    }
}

enum Tiers {
    Tier1,
    Tier2,
    Tier3,
}

function MainPage() {
    const [graph, setGraph] = useState<Graph>(
        new Graph(0, 0, "", true)
    );
    const GraphContainer: React.RefObject<HTMLCanvasElement> =
        useRef<HTMLCanvasElement>(null);
    const RefreshInterval = 1000 / 10;
    const [reRender, setReRender] = useState<boolean>(false);

    // Initialize the graph with my resume information.
    useEffect(() => {
        let graphItems: GraphItem[] = [new GraphItem("test", Tiers.Tier1)];
        graph.AddItems(graphItems);
    }, []);

    // Draw the Text Graph on each render.
    useEffect(() => {
        let canvas = GraphContainer?.current?.getContext("2d");
        if (!canvas) {
            return;
        }

        graph.SetDimensions(window.innerWidth, window.innerHeight, canvas);
        graph.Draw(canvas);
    });

    // Rerender the component every Refresh Interval to do animations.
    setTimeout(() => {
        setReRender(!reRender);
    }, RefreshInterval);

    return (
        <div id="MainPage">
            <canvas
                id="TextGraphCanvas"
                ref={GraphContainer}
                width={window.innerWidth}
                height={window.innerHeight}
            />
        </div>
    );
}

export default MainPage;
