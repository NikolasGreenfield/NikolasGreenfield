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
    private static TierSpeedInc: number = 0; // Item speed increment between item tiers.
    private static MarginTop: number = 20;
    private static ItemSpace: number = 20;

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

        this.Width = width;
        this.Height = height;

        let currentBottom = Graph.MarginTop;
        for (let i = 0; i < this.Items.length; i++) {
            let tier1Item = this.Items[i];
            // Resize item. todo: change to be based on text size
            tier1Item.SetSize(100, 50);

            // Re-position item
            let x = Math.random() * this.Width;
            let y = currentBottom + Graph.ItemSpace;
            tier1Item.SetPosition(x, y);

            this.PositionChildren(tier1Item, currentBottom);
        }
    }
    
    /**
     * Positions the children of the given item around the item.
     * @param item The item to position the children of.
     */
    private PositionChildren(item: GraphItem, currentButtom: number = 0): void {
        for (let i = 0; i < item.Children.length; i++) {
            let x = Math.random() * this.Width;
            let minY = item.Y - (Graph.ItemSpace / 2);
            let y = (Math.random() * ()) + minY;

            // Check if it conflicts with any other items.
        }
    }


    // Position tier 1 item
    // get bounding box for tier 2 items
    // position tier 2 item.
    // check if conflicts with other tier 2 items or tier 1 items.
    // get bounding box for tier 3 items
    // position tier 3 item. check if it conflicts with other tier 3, tier 2, or tier 1 items
    
    private UpdateChildLocations(item: GraphItem, tier: number = 0) {
        for (let i = 0; i < item.Children.length; i++) {
            
        }
    }

    public AddItems(items: GraphItem[], tier: number = 0): void {
        this.Items = this.Items.concat(items);
        this.SetSpeeds(this.Items)
    }

    /**
     * Sets the speed values of all items in the graph based on their tier/level in the graph.
     */
    private SetSpeeds(items: GraphItem[], tier: number = 0): void {
        for (let i = 0; i < items.length; i++) {
            let item = items[i];
    
            item.SpeedX = Math.random() * Graph.TierSpeedInc * tier;
            item.SpeedY = Math.random() * Graph.TierSpeedInc * tier;
            this.SetSpeeds(item.Children, tier + 1);
        }
    }

    /**
     * Moves all graph items their preset speed to animate the graph items.
     * @remarks Should be called every tick for animation.
     */
    public MoveItems(items: GraphItem[] = this.Items) {
        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            item.Move();
            this.MoveItems(item.Children);
        }
    }

    /**
     * Draws the graph on the given canvas.
     * @param canvas The Canvas to draw the items of the graph on.
     */
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
            this.DrawItem(this.Items[i], canvas);
        }
    }
    
    public DrawItem(item: GraphItem, canvas: CanvasRenderingContext2D) {
        // Draw rectangle around Text.
        canvas.beginPath();
        canvas.fillStyle = "red";
        canvas.fillRect(item.X, item.Y, item.Width, item.Height);
        canvas.stroke();

        // Draw Text
        canvas.font = "30px Arial";
        canvas.textAlign = "center";
        canvas.fillStyle = "black";
        canvas.fillText(
            item.Text,
            item.X + item.Width / 2,
            item.Y + item.Height * 0.8
        );

        for (let i = 0; i < item.Children.length; i++) {
            this.DrawItem(item.Children[i], canvas);
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
    public SpeedX: number = 0;
    public SpeedY: number = 0;
    public Children: GraphItem[] = [];

    constructor(text: string) {
        this.Text = text;
    }

    public SetPosition(x: number, y: number) {
        this.X = x;
        this.Y = y;
    }

    public SetSize(width: number, height: number) {
        this.Width = width;
        this.Height = height;
    }

    /**
     * Moves the item's position one tick based on its speed
     */
    public Move() {
        this.X += this.SpeedX;
        this.Y += this.SpeedY;
    }
}

enum Tiers {
    Tier1,
    Tier2,
    Tier3,
}

function CreateGraphItemTree(): GraphItem[] {
    let newItemTree = [
        new GraphItem("test1"),
        new GraphItem("test2"),
        new GraphItem("test3"),
        new GraphItem("test3"),
    ];

    newItemTree[0].Children.push(new GraphItem("1.1"))
    newItemTree[0].Children.push(new GraphItem("1.2"))
    newItemTree[0].Children.push(new GraphItem("1.3"))
    
    newItemTree[1].Children.push(new GraphItem("2.1"))
    newItemTree[1].Children.push(new GraphItem("2.2"))
    
    newItemTree[2].Children.push(new GraphItem("3.1"))

    return newItemTree;
}

function MainPage() {
    const [graph, setGraph] = useState<Graph>(
        new Graph(0, 0, "", true)
    );
    const GraphContainer: React.RefObject<HTMLCanvasElement> =
        useRef<HTMLCanvasElement>(null);
    const RefreshInterval = 1000 / 60;
    const [reRender, setReRender] = useState<boolean>(false);

    // Initialize the graph with my resume information.
    useEffect(() => {
        graph.AddItems(CreateGraphItemTree());
    }, []);

    // Draw the Text Graph on each render.
    useEffect(() => {
        let canvas = GraphContainer?.current?.getContext("2d");
        if (!canvas) {
            return;
        }

        graph.SetDimensions(window.innerWidth, window.innerHeight, canvas);
        graph.MoveItems();
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
