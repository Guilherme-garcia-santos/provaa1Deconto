using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDataContext>();

builder.Services.AddCors(options =>
    options.AddPolicy("Acesso Total",
        configs => configs
            .AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod())
);

var app = builder.Build();

app.MapGet("/", () => "Guilherme G");

//ENDPOINTS DE TAREFA
//GET: http://localhost:5000/api/chamado/listar
app.MapGet("/api/chamado/listar", ([FromServices] AppDataContext ctx) =>
{
    if (ctx.Chamados.Any())
    {
        return Results.Ok(ctx.Chamados.ToList());
    }
    return Results.NotFound("Nenhum chamado encontrada");
});

//POST: http://localhost:5000/api/chamado/cadastrar
app.MapPost("/api/chamado/cadastrar", ([FromServices] AppDataContext ctx, [FromBody] Chamado chamado) =>
{
    if(chamado == null)
    {
        return Results.NotFound("Chamado não encontrado");
    }
    ctx.Chamados.Add(chamado);
    ctx.SaveChanges();
    return Results.Created("", chamado);
});

//PUT: http://localhost:5000/chamado/alterar/{id}
app.MapPut("/api/chamado/alterar/{id}", ([FromServices] AppDataContext ctx, [FromRoute] string id) =>
{
            Chamado? chamado = ctx.Chamados.Find(id);

     if(chamado is null)
        {
            return Results.NotFound("Chamado não encontrado");
        }
        if(chamado.Status == "Aberto")
        {
            chamado.Status = "Em Atendimento";
        }else if (chamado.Status == "Em Atendimento")
        {
            chamado.Status = "Resolvidos";
        }
        ctx.Chamados.Update(chamado);
        ctx.SaveChanges();
        return Results.Ok(ctx.Chamados.ToList());

});

//GET: http://localhost:5000/chamado/naoresolvidos
app.MapGet("/api/chamado/naoresolvidos", ([FromServices] AppDataContext ctx) =>
{
    return Results.Ok(ctx.Chamados.Where(x => x.Status != "Resolvido").ToList());
});

//GET: http://localhost:5000/chamado/resolvidos
app.MapGet("/api/chamado/resolvidos", ([FromServices] AppDataContext ctx) =>
{
    return Results.Ok(ctx.Chamados.Where(x => x.Status == "Resolvido").ToList());
});

app.UseCors("Acesso Total");
app.Run();
