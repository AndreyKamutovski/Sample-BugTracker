using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace Sample_BugTracker.DAL.Interfaces
{
    public interface IRepository<TEntity> where TEntity: class
    {
        TEntity Get(object id);
        IEnumerable<TEntity> GetAll();
        IEnumerable<TEntity> Find(Expression<Func<TEntity, bool>> predicate);

        void Add(TEntity entity);
        void AddRange(IEnumerable<TEntity> entities);

        TEntity Update(TEntity entity, object entityDto);

        void Remove(TEntity entity);
        void RemoveRange(IEnumerable<TEntity> entities);
    }
}
